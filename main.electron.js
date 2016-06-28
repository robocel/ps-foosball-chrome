'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    //mainWindow.openDevTools();

    mainWindow.loadURL('file://' + __dirname + '/index.html');
});