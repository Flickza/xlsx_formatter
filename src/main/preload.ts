import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import XLSX from 'xlsx';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

contextBridge.exposeInMainWorld('dialog', {
  getDir: async () => {
    const result = await ipcRenderer.invoke('dialog:open');
    return result;
  },
});

contextBridge.exposeInMainWorld('save', {
  save: async (_wb: unknown, _filename: string, _dir: string) => {
    const result = await ipcRenderer.invoke('save', _wb, _filename, _dir);
    return result;
  },
});

contextBridge.exposeInMainWorld('processer', {
  sheet: async (_sheet: XLSX.WorkSheet, _defVal: string) => {
    const result = await ipcRenderer.invoke('processer', _sheet, _defVal);
    return result;
  },
});
