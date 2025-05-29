const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

let mainWindow;
let isGeneralAlwaysOnTop = false;
let isAlarmAlwaysOnTop = false;

function updateWindowAlwaysOnTop() {
  if (!mainWindow) return;
  
  if (isAlarmAlwaysOnTop) {
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
  } else if (isGeneralAlwaysOnTop) {
    mainWindow.setAlwaysOnTop(true, 'normal');
  } else {
    mainWindow.setAlwaysOnTop(false);
  }
}

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false,
    },
    show: true,
    alwaysOnTop: false,
  });

  mainWindow.loadURL("http://localhost:5173");

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      app.quit();
    }
  });

  ipcMain.on('set-general-always-on-top', (event, value) => {
    if (isGeneralAlwaysOnTop !== value) {
      isGeneralAlwaysOnTop = value;
      updateWindowAlwaysOnTop();
    }
  });

  ipcMain.on('set-always-on-top', (event, value) => {
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(value);
    }
  });

  ipcMain.on('show-window', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      
      isAlarmAlwaysOnTop = true;
      updateWindowAlwaysOnTop();
      mainWindow.moveTop();
      mainWindow.show();
      mainWindow.focus();
      
      if (process.platform === 'win32') {
        mainWindow.setSkipTaskbar(false);
        mainWindow.flashFrame(true);
      }
    }
  });

  ipcMain.on('focus-window', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      
      isAlarmAlwaysOnTop = true;
      updateWindowAlwaysOnTop();
      mainWindow.moveTop();
      mainWindow.show();
      mainWindow.focus();
      
      if (process.platform === 'win32') {
        mainWindow.flashFrame(true);
      }
    }
  });

  ipcMain.on('disable-always-on-top', () => {
    isAlarmAlwaysOnTop = false;
    updateWindowAlwaysOnTop();
  });

  ipcMain.on('alarm-triggered', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      
      isAlarmAlwaysOnTop = true;
      updateWindowAlwaysOnTop();
      mainWindow.moveTop();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on('before-quit', () => {
  app.isQuiting = true;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
  } else if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
    mainWindow.focus();
  }
});
