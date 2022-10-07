import { Channels } from 'main/preload';
import XLSX from 'xlsx';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    dialog: {
      getDir: () => Promise<string>;
    };
    save: {
      save: (
        _wb: XLSX.WorkBook,
        _filename: string,
        _dir: string
      ) => Promise<any>;
    };
    processer: {
      sheet: (_sheet: XLSX.WorkSheet, _defVal: string) => Promise<any>;
    };
  }
}

export {};
