// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu, globalShortcut } = require('electron')
const path = require('path')
let tray = null

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: 'dist/Kuvira/assets/images/logo-icon.png',
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  }) 

  // and load the index.html of the app.
  mainWindow.loadFile('dist/Kuvira/index.html')
tray = new Tray('dist/Kuvira/assets/images/logo-icon.png')
tray.setToolTip('Kuvira')
//tray.on("click", ()=>{
 // mainWindow.isVisible()?mainWindow.hide():mainWindow.show()  
//})
let template =[{label: 'Settings'}, {label: 'Quit', click:  function(){
  mainWindow.destroy();
  app.quit();
}
}]
let contextMenu=Menu.buildFromTemplate(template)
tray.setContextMenu(contextMenu)
  

   //Open the DevTools.
   //mainWindow.webContents.openDevTools()
globalShortcut.register("Alt+CommandOrControl+k", ()=>{
  if(mainWindow.isVisible()) mainWindow.hide();
  else mainWindow.show();
});


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.