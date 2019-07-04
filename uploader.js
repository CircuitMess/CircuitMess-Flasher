const { erase, flash, platformOptions } = require("./upload_options");

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

      console.log(command, [...params, ...uploadOptions]);
      const process = spawn(command, [...params, ...uploadOptions]);

      process.addListener(outCB, errCB, (code, _) => {
        console.log(code);
        exitCB && exitCB(code);
      });
    } else {
      console.log("Fuck");
    }
  };

  console.log(command, params);
  const process = spawn(command, params);
  addListeners(process, outCB, errCB, upload);
};

const os = "windows";
const port = "COM5";
const platform = "arduino";

const cb = () => {};
const done = () => {
  console.log("done");
};

run(port, os, 115200, cb, cb, done, platform);
