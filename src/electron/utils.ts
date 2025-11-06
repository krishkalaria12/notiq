import { ipcMain, WebContents } from "electron";

export function isDev(): boolean {
    return process.env.NODE_ENV == "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key: Key, 
    handler: () => EventPayloadMapping[Key]
){
    ipcMain.handle(key, (event) => {
        event.senderFrame;
        handler()
    })
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    payload: EventPayloadMapping[Key],
    webContents: WebContents
){
    webContents.send(key, payload)
}