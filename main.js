var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var express =   require("express");
var multer  =   require('multer');
var server         =   express();
var fs = require('fs');
var upload = multer({ dest: 'uploads/' })
var fluxslt = require('fluxslt');
var port = process.env.PORT || 7456;

server.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

server.get('/css/style.css',function(req,res){
      res.sendFile(__dirname + "/css/style.css");
});


server.post('/api/xml',upload.fields([{ name: 'xmlFile', maxCount: 1 }, { name: 'xsltFile', maxCount: 1 }])
,function(req,res){
    var xmlFile = req.files['xmlFile'][0];
    var xsltFile = req.files['xsltFile'];
    var xmlContent = fs.readFileSync('uploads/'+xmlFile.filename, 'utf-8');
    var stylesheet = fs.readFileSync('xslt/export.xslt', 'utf-8');
    if (undefined !== xsltFile) {
        stylesheet = fs.readFileSync('uploads/'+xsltFile.filename, 'utf-8');
    }

    console.log("Executing...");
    fluxslt()
        .withStylesheet(stylesheet)
        .runOn(xmlContent)
        .then(function(transformed) {
            res.set({"Content-Disposition":"attachment; filename=\"parsed-"+xmlFile.originalname+"\""});
            res.send(transformed);
        });
});



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 625});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

server.listen(port,function(){
    console.log("Working on port " + port);
});
