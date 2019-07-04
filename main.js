// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const serialPort = require("serialport");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 625,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:3000/");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

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
const baudrates = [9600, 57600, 74880, 115200, 230400, 460800, 921600];

const upload = require("./uploader");
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

  upload(
    port.comName,
    os,
    baudrates[baudrate],
    dataCB,
    errCB,
    doneCB,
    platforms[platform]
  );
});
