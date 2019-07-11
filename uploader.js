const port_baud_params = (port, baud) => ["--port", port, "--baud", baud];
const default_params = ["--before", "default_reset", "--after", "hard_reset"];

const erase = (port, baud, os) =>
  os === "windows"
    ? {
        command: "lib/esptool.exe",
        params: [
          ...port_baud_params(port, baud),
          ...default_params,
          "erase_flash"
        ]
      }
    : {
        command: "python",
        params: [
          "lib/esptool.py",
          ...port_baud_params(port, baud),
          ...default_params,
          "erase_flash"
        ]
      };

const flash = (port, baud, os) =>
  os === "windows"
    ? {
        command: "lib/esptool.exe",
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
          "lib/esptool.py",
          ...port_baud_params(port, baud),
          ...default_params,
          "write_flash",
          "-z"
        ]
      };

const platformOptions = platform => {
  switch (platform) {
    case "Python":
      return ["0x1000", "lib/bins/python.bin"];
    case "LUA":
      return [
        "--flash_mode",
        "dio",
        "--flash_freq",
        "40m",
        "--flash_size",
        "detect",
        "0x1000",
        "lib/bins/lua/bootloader.GENERIC.bin",
        "0x90000",
        "lib/bins/lua/lua_rtos.bin",
        "0x8000",
        "lib/bins/lua/partitions.bin"
      ];
    default:
      //arduino TODO
      return ["-z", "0x1000", "lib/bins/python.bin"];
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

module.exports = run;
