const port_baud_params = (port, baud) => ["--port", port, "--baud", baud];

const erase = (port, baud, os) =>
  os === "windows"
    ? {
        command: "lib/esptool.exe",
        params: [...port_baud_params(port, baud), "erase_flash"]
      }
    : {
        command: "python",
        params: ["esptool.py", ...port_baud_params(port, baud), "erase_flash"]
      };

const upload = (port, baud, os) =>
  os === "windows"
    ? {
        command: "lib/esptool.exe",
        params: [...port_baud_params(port, baud), "write_flash"]
      }
    : {
        command: "python",
        parmas: ["esptool.py", ...port_baud_params(port, baud), "write_flash"]
      };

const platformOptions = platform => {
  switch (platform) {
    case "python":
      return ["-z", "0x1000", "libs/bins/python.bin"];
    case "lua":
      return ["-z", "0x1000", "libs/bins/python.bin"];
    default:
      //arduino
      return ["-z", "0x1000", "libs/bins/python.bin"];
  }
};

module.exports = { erase, upload, platformOptions };
