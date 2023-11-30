// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

const api = {
  logout: async () => ipcRenderer.invoke('logout'),
  getUser: async () => ipcRenderer.invoke('getUser'),
  getDrivers: async () => ipcRenderer.invoke('getDrivers'),
  getVehicles: async () => ipcRenderer.invoke('getVehicles'),
  getGateways: async () => ipcRenderer.invoke('getGateways'),
};

process.once('loaded', () => {
  contextBridge.exposeInMainWorld('api', api);
});

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
