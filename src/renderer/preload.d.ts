import { Channels } from 'main/preload';

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
      save: (_wb: unknown, _filename: string, _dir: string) => Promise<any>;
    };
  }
}

export {};
