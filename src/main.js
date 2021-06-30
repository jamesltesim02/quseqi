const path = require('path');
const {
  app,
  protocol,
  ipcMain,
  BrowserWindow,
} = require('electron');
// const screenshot = require('desktop-screenshot');

const MainFrame = require('./MainFrame');
const PickFrame = require('./PickFrame');

app.whenReady().then(() => {
  MainFrame()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      MainFrame();
    }
  });

  protocol.registerBufferProtocol('file', (request, callback) => {
    const pathname = decodeURIComponent(request.url.replace('file:///', ''));
    callback(pathname);
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('open-pick-frame', async (event, arg) => {
  PickFrame();
});

// ipcMain.on('quse', async (event, arg) => {
//   // 截屏
//   screenshot(
//     'screenshot.png',
//     (error, complete) => {
//       console.log(error, complete);
//       if (error) {
//         console.log('Handle error.');
//         return;
//       }

//       console.log('Success.')
//     }
//   )
// });
