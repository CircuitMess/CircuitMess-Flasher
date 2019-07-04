const port = "COM5";
const platform = "windows";

const addListeners = (process, type, callback = undefined) => {
  process.stdout.on("data", function(data) {
    console.log("stdout: " + data);
  });

  process.stderr.on("data", function(data) {
    console.error("stderr: " + data);
  });

  process.on("exit", (code, signal) => {
    console.log("Foobar", code, signal);
    if (type === "erase" && callback) {
      callback();
    }
  });
};

const erase = (port, platform, callback) => {
  const runCommandWindows = "dist/esptool.exe";
  const paramsWindows = ["--port", port, "--baud", "115200", "erase_flash"];

  const runCommandLinux = "python";
  const paramsLinux = ["esptool.py", ...paramsWindows];

  const command = platform =>
    platform === "windows" ? runCommandWindows : runCommandLinux;
  const params = platform =>
    platform === "windows" ? paramsWindows : paramsLinux;

  const spawn = require("child_process").spawn;
  const process = spawn(command(platform), params(platform));

  addListeners(process, "erase", callback);
};

const upload = (port, platform, os) => {
  console.log("UPLOAD");

  const python = ["-z", "0x1000", "./libs/python.bin"];

  const osSpecific = os === "python" ? python : os === "lua" ? [] : [];

  const runCommandWindows = "dist/esptool.exe";
  const paramsWindows = [
    "--port",
    port,
    "--baud",
    "115200",
    "write_flash",
    ...osSpecific
  ];

  const runCommandLinux = "python";
  const paramsLinux = ["esptool.py", ...paramsWindows];

  const command = platform =>
    platform === "windows" ? runCommandWindows : runCommandLinux;
  const params = platform =>
    platform === "windows" ? paramsWindows : paramsLinux;

  const spawn = require("child_process").spawn;
  const process = spawn(command(platform), params(platform));

  addListeners(process, "upload");
};
