const path = require('path');
const { BrowserWindow, screen } = require('electron');

const MainFrame = function (ipcMain) {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const fullBounds = {
    x: 0,
    y: 0,
    ...screenSize,
  };

  const normalBounds = {
    width: 400,
    height: 400,
    x: screenSize.width - 410,
    y: screenSize.height - 410,
  };

  const win = new BrowserWindow({
    ...normalBounds,
    // resizable: false,
    // alwaysOnTop: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.openDevTools();
  win.loadFile(path.join(__dirname, 'MainFrame.html'));

  ipcMain.on('main-fullscreen', (event, fullscreen) => {
    win.setFullScreen(fullscreen);
  });

  return win;
};

module.exports = MainFrame;
