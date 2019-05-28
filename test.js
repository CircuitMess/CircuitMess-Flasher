var serialPort = require('serialport');

serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    if(port.pnpId || port.manufacturer){
      console.log(port);
    }
  });
});

// ipcMain.on('foo', function(e, foo){
//   // mainWindow.webContents.send('item:add', item);
//   console.log(foo);
//   // for(let i = 0; i < 10; i++){
//   //   mainWindow.webContents.send('FooToYou', `Some data ${i * 10}`);
//   // }

//   const testScript = spawn('sh', ['test.sh']);

//   testScript.stdout.on('data', (data) => {
//     mainWindow.webContents.send('data', data);
//   });
//   testScript.stderr.on('data', (data) => {
//     mainWindow.webContents.send('err', data);
//   });
//   testScript.on('exit', function (code) {
//     mainWindow.webContents.send('done', code);
//   });
// });