import { app, BrowserWindow } from 'electron'
import path = require('path')
import url = require('url')

function createWindow () {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const NODE_ENV = process.env.NODE_ENV || 'development'
  if (NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
