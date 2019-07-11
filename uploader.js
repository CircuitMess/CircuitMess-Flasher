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
