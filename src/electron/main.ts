import { app, BrowserWindow } from "electron"
import path from "path"
import { ipcMainOn, isDev } from "./utils.js"
import { getPreloadPath } from "./path-resolver.js"

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