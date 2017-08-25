
const {app, BrowserWindow, ipcMain} = require("electron"),
	path = require("path"),
	url = require("url");

const {autoUpdater} = require("electron-updater");
const {default: installExtension, REACT_DEVELOPER_TOOLS} = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don"t, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// React Developer Tools
	installExtension(REACT_DEVELOPER_TOOLS)
    	.then((name) => console.log(`Added Extension: ${name}`))
    	.catch((err) => console.log("An error occurred: ", err));

	mainWindow = new BrowserWindow({
		width: 1000, height: 600,
		icon: path.join(__dirname, "icon-64x64.png")
	});

	// nascondo il menu di Electron!
	mainWindow.setMenu(null);

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "index.html" ),
		protocol: "file:",
		slashes: true
	}) );

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", () => {
	createWindow();
	autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
	if ( process.platform !== "darwin" ) {
		app.quit();
	}
});

app.on("activate", () => {
	if ( mainWindow === null ) {
		createWindow();
	}
});

// inizio AUTO-UPDATER //
function send(event, text = "") {
	mainWindow && mainWindow.webContents.send(event, text);
}

autoUpdater.on("checking-for-update", () => {
	send("info", "Checking for update...");
});

autoUpdater.on("update-available", () => {
	send("info", "Update available");
});

autoUpdater.on("update-not-available", () => {
	send("info", "Update not available");
});

autoUpdater.on("error", () => {
	send("info", "Error in auto-updater");
});

autoUpdater.on("download-progress", () => {
	send("info", "Download in progress...");
});

autoUpdater.on("update-downloaded", () => {
	send("info", "Update downloaded");
	send("update-downloaded");
});

ipcMain.on("restart", () => {
	autoUpdater.quitAndInstall();
});
// fine AUTO-UPDATER //

require("electron-debug")();
