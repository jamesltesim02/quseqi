const ipcRenderer = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }

  const etButton = document.getElementById('event-trigger');
  etButton.addEventListener('click', () => {
    // console.log('event trigged');
    ipcRenderer.send('quse', true)
  });
})