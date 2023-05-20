const { app, BrowserWindow, ipcMain } = require("electron")
const axios = require('axios');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    require('@electron/remote/main').initialize()
    require("@electron/remote/main").enable(win.webContents)

    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.on('fetch-data', async (event, args) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/users');
            event.reply('fetch-data-response', response.data);
        } catch (error) {
            console.error(error);
        }
    });
})