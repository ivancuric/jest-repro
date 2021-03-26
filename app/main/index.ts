import { app, BrowserWindow, protocol } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

// disable security warnings for live reload
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

/**
 * the `file:///` protocol can't be used in electron
 * https://stackoverflow.com/a/61623585/3153874
 */
function registerProtocols() {
  const protocolName = 'safe-file-protocol';

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '');
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      // Handle the error as needed
      console.error(error);
    }
  });
}

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      // contextIsolation needs to be false to run video-module in renderer
      contextIsolation: false,
      // devTools: !app.isPackaged,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (!app.isPackaged) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  // mainWindow.webContents.on('did-navigate', () => {
  // stopAllStreams();
  // });

  mainWindow.webContents.on('did-frame-finish-load', () => {
    // Open the DevTools.
    if (!app.isPackaged) {
      mainWindow.webContents.openDevTools();
    }
  });
}

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this event
// occurs.
app.on('ready', () => {
  registerProtocols();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common for
// applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // Disabled for now
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }

  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is
  // clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  // TODO: stop all streams
  // stopAllStreams();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
