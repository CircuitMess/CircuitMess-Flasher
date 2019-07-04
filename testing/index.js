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

const port = "/dev/ttyUSB0";

const spawn = require("child_process").spawn;
const command = spawn("python", [
  "esptool.py",
  "-p",
  port,
  "--baud",
  "115200",
  "erase_flash"
]);

command.stdout.on("data", function(data) {
  console.log("stdout: " + data);
});

command.stderr.on("data", function(data) {
  console.log("stderr: " + data);
});
