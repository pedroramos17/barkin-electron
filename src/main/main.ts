/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, session } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import electronCookies from 'electron-cookies';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const API_HOST = 'http://localhost';

const appSession = session.fromPartition('persist:auth');

const csrfRequest = async () =>
  fetch(`${API_HOST}/sanctum/csrf-cookie`, {
    method: 'GET',
  });

const cookiesResponse = await csrfRequest();

const cookiesFromResponse = cookiesResponse.headers['set-cookie'];
function parseCookieString(cookieString: string) {
  const cookieParts = cookieString.split(';');
  const [name, value] = cookieParts[0].split('=');
  const domain = cookieParts
    ? cookieParts
        .find((part) => part.trim().startsWith('Domain='))
        .trim()
        .substring(7)
    : undefined;
  const path = cookieParts
    ? cookieParts
        .find((part) => part.trim().startsWith('Path='))
        .trim()
        .substring(5)
    : '';

  return {
    name,
    value,
    domain,
    path,
    // You can parse more cookie properties if necessary (e.g., secure, httpOnly, etc.)
  };
}

cookiesFromResponse.forEach((cookie: string) => {
  const parsedCookie = parseCookieString(cookie);
  electronCookies.set({
    name: parsedCookie.name,
    value: parsedCookie.value,
    domain: parsedCookie.domain,
    path: parsedCookie.path,
    session: appSession,
  });
});

// Function to retrieve cookies from the Electron session
const getCookies = () => {
  const cookies = electronCookies.filter({
    session: session.defaultSession,
  });

  // Convert the cookies into a string that can be included in the request header
  const cookieString = cookies
    .map((cookie: any) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return cookieString;
};

const signupResquest = async (formData: any) => {
  const cookies = getCookies();

  const resquestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${API_HOST}/resgister`, resquestOptions);
    return response;
  } catch (error) {
    console.error(error);
  }
};

ipcMain.on('submit-form', async (event, formData) => {
  try {
    const apiResponse = await signupResquest(formData);

    event.sender.send('form-submission-success', apiResponse);
  } catch (error) {
    event.sender.send('form-submission-error', error);
  }
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('logo.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
