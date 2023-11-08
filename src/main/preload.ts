// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('store-get', key);
    },
    set(key: string, value: string) {
      ipcRenderer.send('store-set', key, value);
    },
  },
});
