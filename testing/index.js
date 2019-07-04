// const esptool = require("esptool-wrapper");

// esptool(
//   {
//     chip: "esp32",
//     port: "/dev/ttyUSB0",
//     baud: 460800,
//     files: {
//       0x1000: "libs/python.bin"
//     }
//   },
//   function(err) {
//     if (err) throw err; // hopefully I tell you *WHAT* went wrong
//     console.log("Nothing went wrong!");
//   }
// );

// const esptool = require("esptoolpy-js");
// esptool.read_mac("/dev/ttyUSB0", foo => console.log(foo));

const port = "COM5";
const platform = "windows";

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

process.stdout.on("data", function(data) {
  console.log("stdout: " + data);
});

process.stderr.on("data", function(data) {
  console.error("stderr: " + data);
});
