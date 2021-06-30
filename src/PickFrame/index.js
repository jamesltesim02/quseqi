const path = require('path');
const {
  BrowserWindow,
  screen,
} = require('electron');

const PickFrame = function () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, 'PickFrame.html'));

  return win;
};

module.exports = PickFrame;
