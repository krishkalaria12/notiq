const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  sendFrameAction: (payload) => ipcSend("sendFrameAction", payload),
  getNote: (payload) => ipcInvoke("getNote", payload),
  getNotes: () => ipcInvoke("getNotes"),
  deleteNote: (payload) => ipcInvoke("deleteNote", payload),
  setNote: (payload) => ipcInvoke("setNote", payload),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload?: EventPayloadMapping[Key]
): Promise<any> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) {
  electron.ipcRenderer.send(key, payload);
}