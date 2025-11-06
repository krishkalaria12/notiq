import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from "url";
import { getUIPath } from "./path-resolver.js";

export function isDev(): boolean {
    return process.env.NODE_ENV == "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => Promise<any> | any
) {
  ipcMain.handle(key, (event, payload) => {
    validateEventFrame(event.senderFrame);
    return handler(payload);
  });
}

export function ipcMainOn<Key extends keyof EventPayloadMapping>(
    key: Key, 
    handler: (payload: EventPayloadMapping[Key]) => void
){
    ipcMain.on(key, (event, payload) => {
        validateEventFrame(event.senderFrame);
        return handler(payload)
    })
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    payload: EventPayloadMapping[Key],
    webContents: WebContents
){
    webContents.send(key, payload)
}

export function validateEventFrame(frame: WebFrameMain | null) {
    if (!frame) {
        return;
    }
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious event');
    }
}