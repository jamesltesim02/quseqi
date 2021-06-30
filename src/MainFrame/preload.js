const path = require('path');
const { ipcRenderer } = require('electron');
const screenshot = require('desktop-screenshot');

// const PickFrame = require('../PickFrame');

window.addEventListener('DOMContentLoaded', () => {
  const etButton = document.getElementById('event-trigger');
  etButton.addEventListener('click', () => {
    // console.log('event trigged');
    // ipcRenderer.send('quse', true)
    // 截屏
    // screenshot(
    //   'screenshot.png',
    //   (error, complete) => {
    //     console.log(error, complete);
    //     if (error) {
    //       console.log('Handle error.');
    //       return;
    //     }

    //     console.log('Success.')
    //   }
    // )

    // 截屏
    screenshot(
      '../temp/screenshot.png',
      (error, complete) => {
        if (error) {
          console.log('Handle error.');
          return;
        }

        // PickFrame();
        ipcRenderer.send('open-pick-frame', true)
        console.log('Success.');
      }
    );
  });
})