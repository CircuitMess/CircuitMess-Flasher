// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const serialPort = require("serialport");
const spawn = require("child_process").spawn;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:3000/");

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
const baudrates = [9600, 57600, 74880, 115200, 230400, 460800, 921600];

const { foo, bar } = require("./uploader");

ipcMain.on("upload", (e, data) => {
  const platform = process.platform === "win32" ? "windows" : "linux";

  // const params = [
  //   "upload.sh",
  //   platforms[data.platform],
  //   baudrates[data.baudrate],
  //   data.port.comName
  // ];
  // const testScript = spawn("sh", params);
  // testScript.stdout.on("data", data => {
  //   mainWindow.webContents.send("console:data", data);
  // });
  // testScript.stderr.on("data", data => {
  //   mainWindow.webContents.send("console:err", data);
  // });
  // testScript.on("exit", function(code) {
  //   mainWindow.webContents.send("console:done", code);
  // });
});
