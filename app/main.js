
const { app, BrowserWindow } = require( "electron" ),
	path = require( "path" ),
	url = require( "url" );

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require( "electron-devtools-installer" );

// Keep a global reference of the window object, if you don"t, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// React Developer Tools
	installExtension(REACT_DEVELOPER_TOOLS)
    	.then((name) => console.log(`Added Extension: ${name}`))
    	.catch((err) => console.log("An error occurred: ", err));

	mainWindow = new BrowserWindow({
		width: 1000, height: 600
	});

	// nascondo il menu di Electron!
	mainWindow.setMenu(null);

	mainWindow.loadURL( url.format({
		pathname: path.join( __dirname, "index.html" ),
		protocol: "file:",
		slashes: true
	}) );

	mainWindow.on( "closed", () => {
		mainWindow = null;
	});
}

app.on( "ready", createWindow );

app.on( "window-all-closed", () => {
	if ( process.platform !== "darwin" ) {
		app.quit();
	}
});

app.on( "activate", () => {
	if ( mainWindow === null ) {
		createWindow();
	}
});

require( "electron-debug" )();
