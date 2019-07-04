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
          "esptool.py",
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
        parmas: [
          "esptool.py",
          ...port_baud_params(port, baud),
          ...default_params,
          "write_flash",
          "-z"
        ]
      };

const platformOptions = platform => {
  switch (platform) {
    case "python":
      return ["0x1000", "lib/bins/python.bin"];
    case "lua":
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

module.exports = { erase, flash, platformOptions };
