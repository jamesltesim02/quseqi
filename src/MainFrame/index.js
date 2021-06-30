const path = require('path');
const { BrowserWindow } = require('electron');

const MainFrame = function () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, 'MainFrame.html'));

  return win;
};

module.exports = MainFrame;
