const path = require('path');
const { BrowserWindow, screen } = require('electron');

const MainFrame = function (ipcMain) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    x: width - 410,
    y: height - 410,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.openDevTools();
  win.loadFile(path.join(__dirname, 'MainFrame.html'));

  ipcMain.on('main-fullscreen', (event, fullscreen) => win.setFullScreen(fullscreen));

  return win;
};

module.exports = MainFrame;
