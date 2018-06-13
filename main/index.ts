import { app, BrowserWindow } from 'electron'
import path = require('path')
import url = require('url')

const defaultIndex = url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
})

const parseArgs = (env: string) => {
  const findIndexHTML = () => {
    const i = process.argv.findIndex(v => v === '--index')
    if (i > -1 && process.argv.length > i + 1) return process.argv[i + 1]
    else return defaultIndex
  }

  if (env === 'development') {
    return {
      flags: {
        help: false,
        index: findIndexHTML()
      }
    }
  } else {
    return {
      flags: {
        help: false,
        index: defaultIndex // force defaultIndex
      }
    }
  }
}

function createWindow() {
  const NODE_ENV = process.env.NODE_ENV || 'development'
  const args = parseArgs(NODE_ENV)

  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nativeWindowOpen: true
    }
  })

  win.loadURL(args.flags.index)

  if (NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
