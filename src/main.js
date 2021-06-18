const path = require('path');
const {
  app,
  BrowserWindow,
  ipcMain,
  // desktopCapturer,
} = require('electron');
// const screenshot = require('desktop-screenshot');

// const ipcMain = require('electron').ipcMain;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.openDevTools()

  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('quse', async (event, arg) => {
  // 截屏
  screenshot(
    'screenshot.png',
    (error, complete) => {
      console.log(error, complete);
      if (error) {
        console.log('Handle error.');
        return;
      }

      console.log('Success.')
    }
  )

  // 使用desktopCapturer来截屏, 貌似有问题
  // const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  // const electronSource = sources.find(s => s.name === 'Electron');
  // if (!electronSource) {
  //   return;
  // }
  // try {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: false,
  //     video: {
  //       mandatory: {
  //         chromeMediaSource: 'desktop',
  //         chromeMediaSourceId: source.id,

  //       }
  //     }
  //   });
  // } catch (e) {
  // }
});
