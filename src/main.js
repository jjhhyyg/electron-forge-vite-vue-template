const {app, BrowserWindow} = require('electron');
const path = require('path');
const {spawn} = require('child_process');
const log = require('electron-log');
const net = require('net');

const isDevelopment = process.env.NODE_ENV !== 'production'
// 后端主进程
let server
let serverPort = 8080
// 后端jar包名称
const serverName = 'Application.jar'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegrationInWorker: true
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }

    // Open the DevTools.
    if (isDevelopment) {
        mainWindow.openDevTools()
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    if (startServer()) {
        createWindow()
    } else {
        app.quit()
    }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('before-quit', () => {
    server.kill()
    server = null
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// 自定义函数

const startServer = () => {
    let serverPath = `${path.join(app.getAppPath(), 'src', 'server', serverName)}`
    log.info(`Server path is ${serverPath}.`)
    log.info(`Launching server with jar ${serverName}`)
    server = spawn('java', ['-jar', serverPath])

    server.on('close', (code) => {
        log.info(`Server exited with code ${code}.`)
        app.quit()
    })
    if (server.pid) {
        log.info(`Server launched with pid ${server.pid}.`)
        return true
    } else {
        log.error('Server failed to launch.')
        app.quit()
        return false
    }
}