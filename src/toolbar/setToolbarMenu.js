const {app, Menu} = require('electron');
const open = require('open');

const isOnMac = process.platform === 'darwin';

const menuTemplate = [
  { label: 'File',
    submenu: [
      {
        label: 'New',
        submenu: [
          { label: 'Project' },
        ]
      },
      {
        label: 'Open'
      },
      {
        label: 'Save',
        accelerator: 'Ctrl+S',
      },
      { type: 'separator' },
      {
        label: 'Settings',
        accelerator: isOnMac?'Ctrl+Cmd+S':'Ctrl+Alt+S',
        click: () => {
        }
      },
      { type: 'separator' },
      {
        label: 'Exit',
        click: () => {app.quit();},
      },
    ]
  },
  { label: 'Edit',
    submenu: [
      {
        label: 'Undo'
      },
      {
        label: 'Redo'
      },
    ]
  },
  {
    label: 'View',
    submenu: []
  },
  {
    label: 'Tools',
    submenu: []
  },
  { label: 'Help',
    submenu: [
      {
        label: 'About',
        click: () => {open("https://github.com/Ozu-Beatmap-Toolset/ozu-gui");},
      },
    ]
  },
]

function setAppMenu(window) {
  window.removeMenu();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
}

module.exports = {
  setAppMenu
};
