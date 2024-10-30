const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('open-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Markdown Files', extensions: ['md'] }],
    });

    if (!canceled && filePaths.length > 0) {
        return fs.readFileSync(filePaths[0], 'utf-8');
    }
    return null;
});

ipcMain.handle('save-file', async (event, content) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        filters: [{ name: 'Markdown Files', extensions: ['md'] }],
    });

    if (!canceled && filePath) {
        fs.writeFileSync(filePath, content, 'utf-8');
    }
});
