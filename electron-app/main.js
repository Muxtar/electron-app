'use strict'
const { app, BrowserWindow, Menu, ipcMain } = require('electron/main');
const url = require('url');
const path = require('path');
// const fs = require('fs');

let loginWindow, mainWindow, user;
const secretKey = '109342!(&(()))_+awqxbcvasapoqwpquzha)*^^%#@$4724';

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './react-app/build/index.html'),
    protocol: 'file:',
    slashes: true
});

ipcMain.on('login', (event, data)=>{
    let loginRequest = function(username = 'muxtar', password = '1992'){
        let method = 'POST';
        let url = '127.0.0.1';
        let port = '8080';

        let data = {
            token:secretKey,
            username:username,
            password:password,
        }

        fetch(`http://${url}:${port}/login`, {
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();

        }).then(data     => {
           if(data.message == 'success'){
                user = data.user; 
                loginWindow.close();
                createMainWindow();
           }else{
            loginWindow.webContents.send('message', 'error');
           }
        }).catch(error   => {
            loginWindow.webContents.send('message','server-error')
        }).finally(()=>{

        })

    }
    loginRequest(data.username, data.password);
})


ipcMain.on('exit', (event, data)=>{
    if(data == 'exit'){
        mainWindow.close();
        createLoginWindow();
    }
})

const loginTemplate = []
const mainTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label:'New file',
            },
            {
                label:'Open file'
            }
        ]
    }
]

// ana ekran penceresi
function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences:{
            preload:path.join(__dirname, './preload.js')
        },
        title:'Main',
        show:false
    })
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:3000/main')
    // mainWindow.loadURL(`${startUrl}#/main`)

    const mainMenu = Menu.buildFromTemplate(mainTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('ready-to-show', ()=>{
        mainWindow.show()
        mainWindow.webContents.send('user', JSON.stringify({username:user.username, token:secretKey}));
        console.log(typeof user);
        console.log(JSON.stringify(user));
    })
}

// login pencersi
function createLoginWindow(){
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload:path.join(__dirname, './preload.js'),
        },
        title:'Login',
        backgroundColor:' #2f303f',
        show:false
    })

    loginWindow.webContents.openDevTools()
    // loginWindow.loadURL(startUrl)
    loginWindow.loadURL('http://localhost:3000');
    // loginWindow.setResizable(false);

    const loginMenu = Menu.buildFromTemplate(loginTemplate);
    Menu.setApplicationMenu(loginMenu); 
    
    // program yuklendikden sonra ekran gorunur ve ekrandaki anliq ag ekran gorunmur
    loginWindow.once('ready-to-show', ()=>{
        loginWindow.show();
    })
}

app.whenReady().then(()=>{
    createLoginWindow();
})

