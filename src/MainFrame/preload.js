const path = require('path');
const fs = require('fs');
const screenshot = require('desktop-screenshot');
const filepath = path.resolve(__dirname, 'screenshot.png');

const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const screenshotImage = document.getElementById('screenshotImage');

  const toggleFullscreen = fullscreen => {
    if (window.__QUSEQI_FULLSCREEN__ === fullscreen) {
      return;
    }
    ipcRenderer.send('main-fullscreen', fullscreen);
    window.__QUSEQI_FULLSCREEN__ = fullscreen;
    document.body.classList.toggle('fullscreen');
  };

  window.addEventListener('keyup', (event) => {
    if (event.code ===  'Escape') {
      toggleFullscreen(false);
    }
  });

  document.body.addEventListener('mousedown', (event) => {
    if (event.button === 2) {
      toggleFullscreen(false);
    }
  });

  screenshotImage.addEventListener('mousemove', (event) => {
    console.log(event);
  });

  document.getElementById('event-trigger').addEventListener('click', () => {
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
      filepath,
      (error, complete) => {
        console.log(error, complete);
        if (error) {
          console.log('Handle error.');
          return;
        }

        const byteData = fs.readFileSync(filepath);
        const base64Data = byteData.toString('base64');
        window.__QUSEQI_SCREENSHOT__ = base64Data;

        const image = document.getElementById('screenshotImage');
        image.src = `data:image/png;base64, ${base64Data}`;
        toggleFullscreen(true);
        // PickFrame();
        // ipcRenderer.send('open-pick-frame', true)
        // console.log('Success.');
      }
    );
  });
})