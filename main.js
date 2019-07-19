// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const serialPort = require("serialport");
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  // mainWindow.loadURL("http://localhost:3000/");
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on("ports", (e, data) => {
  serialPort.list(function(err, allPorts) {
    const ports = allPorts.filter(port => port.pnpId || port.manufacturer);
    mainWindow.webContents.send("ports", ports);
  });
});

const platforms = ["Arduino", "Python", "LUA"];
const baudrates = [115200, 230400, 460800, 921600];

const port_baud_params = (port, baud) => ["--port", port, "--baud", baud];
const default_params = ["--before", "default_reset", "--after", "hard_reset"];

const libPath = process.env.ELECTRON_START_URL ? "lib/" : "resources/lib/";

const erase = (port, baud, os) =>
  os === "windows"
    ? {
        command: `${libPath}esptool.exe`,
        params: [
          ...port_baud_params(port, baud),
          ...default_params,
          "erase_flash"
        ]
      }
    : {
        command: "python",
        params: [
          `${libPath}esptool.py`,
          ...port_baud_params(port, baud),
          ...default_params,
          "erase_flash"
        ]
      };

const flash = (port, baud, os) =>
  os === "windows"
    ? {
        command: `${libPath}esptool.exe`,
        params: [
          ...port_baud_params(port, baud),
          ...default_params,
          "write_flash",
          "-z"
        ]
      }
    : {
        command: "python",
        params: [
          `${libPath}esptool.py`,
          ...port_baud_params(port, baud),
          ...default_params,
          "write_flash",
          "-z"
        ]
      };

const platformOptions = platform => {
  switch (platform) {
    case "Python":
      return ["0x1000", `${libPath}bins/python.bin`];
    case "LUA":
      return [
        "--flash_mode",
        "dio",
        "--flash_freq",
        "40m",
        "--flash_size",
        "detect",
        "0x1000",
        `${libPath}bins/lua/bootloader.GENERIC.bin`,
        "0x90000",
        `${libPath}bins/lua/lua_rtos.bin`,
        "0x8000",
        `${libPath}bins/lua/partitions.bin`
      ];
    default:
      //arduino TODO
      return ["-z", "0x1000", `${libPath}bins/python.bin`];
  }
};

const addListeners = (process, outCB, errCB, exitCB) => {
  process.stdout.on("data", outCB);
  process.stderr.on("data", errCB);
  process.on("exit", exitCB);
};

const run = (port, os, baud, outCB, errCB, exitCB, platform) => {
  const spawn = require("child_process").spawn;
  const { command, params } = erase(port, baud, os);
  const upload = (code, _) => {
    if (code === 0) {
      const spawn = require("child_process").spawn;
      const { command, params } = flash(port, baud, os);
      const uploadOptions = platformOptions(platform);

      outCB(`${"#".repeat(20)}\nUploading ${platform}\n${"#".repeat(20)}\n`);

      console.log(command, [params, uploadOptions]);
      const process = spawn(command, [...params, ...uploadOptions]);

      addListeners(process, outCB, errCB, (code, _) => {
        console.log(code);
        console.log("Done");
        exitCB && exitCB(code);
      });
    } else {
      console.log("Fuck");
    }
  };

  const process = spawn(command, params);
  addListeners(process, outCB, errCB, upload);
};

const dataCB = data => {
  console.log("FOOBAR - data");
  mainWindow.webContents.send("console:data", data);
};

const errCB = data => {
  console.log("FOOBAR - err");
  mainWindow.webContents.send("console:err", data);
};

const doneCB = code => {
  console.log("FOOBAR - done");
  mainWindow.webContents.send("console:done", code);
};

ipcMain.on("upload", (e, data) => {
  const os = process.platform === "win32" ? "windows" : "linux";
  const { port, baudrate, platform } = data;

  dataCB("!!!CLEAR!!!");
  dataCB(`${"#".repeat(20)}\nErasing Flash\n${"#".repeat(20)}\n`);

  run(
    port.comName,
    os,
    baudrates[baudrate],
    dataCB,
    errCB,
    doneCB,
    platforms[platform]
  );
});
