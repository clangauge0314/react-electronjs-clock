const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  setAlwaysOnTop: (value) => ipcRenderer.send('set-always-on-top', value),
  showWindow: () => ipcRenderer.send('show-window'),
  focusWindow: () => ipcRenderer.send('focus-window'),
  disableAlwaysOnTop: () => ipcRenderer.send('disable-always-on-top'),
  alarmTriggered: () => ipcRenderer.send('alarm-triggered'),
  setGeneralAlwaysOnTop: (value) => ipcRenderer.send('set-general-always-on-top', value),
});
