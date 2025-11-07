import { app, BrowserWindow } from "electron"
import path from "path"
import { ipcMainHandle, ipcMainOn, isDev } from "./utils.js"
import { getPreloadPath } from "./path-resolver.js"
import { create_note, delete_note, get_all_notes, get_note, set_note } from "./db/db.js"

app.on(
    "ready",
    () => {
        const mainWindow = new BrowserWindow({
            webPreferences: {
                preload: getPreloadPath()
            },
            frame: false
        })

        if (isDev()) {
            mainWindow.loadURL("http://localhost:5123")
        } else {
            mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
        }

        ipcMainHandle("getNote", async (payload) => {
            const note = get_note(payload);
            return note;
        });

        ipcMainHandle("createNote", async (payload) => {
            const note = create_note(payload.note_content);
            return note;
        });

        ipcMainHandle("deleteNote", (payload) => {
            delete_note(payload);
        });

        ipcMainHandle("setNote", (payload) => {
            set_note(payload);
        });

        ipcMainHandle("getNotes", () => {
            get_all_notes();
        });
        
        ipcMainOn("sendFrameAction", (payload) => {
            switch (payload) {
                case "CLOSE":
                    mainWindow.close();
                    break;
                case "MAXIMIZE":
                    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
                    break;
                case "MINIMIZE":
                    mainWindow.minimize();
                    break;
                default:
                    break;
            }
        })

        handleCloseEvents(mainWindow)
    }
)

function handleCloseEvents(mainWindow: BrowserWindow) {
    let willClose = false;

    mainWindow.on("close", (event) => {
        if (willClose) {
            return
        }

        event.preventDefault()
        mainWindow.hide()
        if (app.dock) {
            app.dock.hide();
        }
    })

     app.on("before-quit", () => {
        willClose = true;
    })

    mainWindow.on("show", () => {
        willClose = false;
    })
}