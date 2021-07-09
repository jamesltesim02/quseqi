// const path = require('path');
// const fs = require('fs');
const { ipcRenderer } = require('electron');
const screenshot = require('screenshot-desktop');

// const filepath = path.resolve(__dirname, 'screenshot.png');
// const screenshot = require('desktop-screenshot');

window.addEventListener('DOMContentLoaded', () => {
  const screenshotImage = document.getElementById('screenshotImage');
  const locationText = document.getElementById('locationText');
  const imageCanvas = document.createElement('canvas');
  const imageStyle = window.getComputedStyle(screenshotImage);
  imageCanvas.width = imageStyle.width;
  imageCanvas.height = imageStyle.height;
  const imageConext = imageCanvas.getContext('2d');

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

  document.body.addEventListener('mousemove', (event) => {
    if (!window.__QUSEQI_FULLSCREEN__) {
      return;
    }

    const { clientX, clientY } = event;
    locationText.style.left = `${clientX + 10}px`;
    locationText.style.top = `${clientY}px`;
    locationText.innerHTML = (
      `
      <header>当前坐标:</header>
      <section>x:${clientX},y:${clientY}</section>
      <section>${String(imageConext.getImageData(clientX, clientY, 1, 1).data)}</section>
      `
    );
  });

  document.getElementById('event-trigger').addEventListener('click', async () => {
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
    // screenshot(
    //   filepath,
    //   (error, complete) => {
    //     console.log(error, complete);
    //     if (error) {
    //       console.log('Handle error.');
    //       return;
    //     }

    //     const byteData = fs.readFileSync(filepath);
    //     const base64Data = byteData.toString('base64');
    //     window.__QUSEQI_SCREENSHOT__ = base64Data;

    //     const image = document.getElementById('screenshotImage');
    //     image.src = `data:image/png;base64, ${base64Data}`;
    //     toggleFullscreen(true);
    //     // PickFrame();
    //     // ipcRenderer.send('open-pick-frame', true)
    //     // console.log('Success.');
    //   }
    // );


    const imgs = await screenshot.all();
    const base64Data = imgs[0].toString('base64');
    screenshotImage.src = `data:image/png;base64, ${base64Data}`;
    imageConext.drawImage(screenshotImage, 0, 0);

    toggleFullscreen(true);
  });
})