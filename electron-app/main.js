'use strict'

// ELECTRON MAIN FILE
const { app, BrowserWindow, Menu, ipcMain, screen } = require('electron/main');
const url = require('url');
const path = require('path');

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
        user = '';
    }
})

ipcMain.on('sqlQuery', (event, data)=>{
    // console.log(data)
    fetch('http://127.0.0.1:8000/sql-query', {
                method:'POST',
                headers:{
                    'Content-Type':'application/text-plain'
                },
                body:JSON.stringify(data)
            }).then(data => {
                return data.json()
            }).then(data => {
                console.log(data)
            }).catch(()=>{
                console.log('error yarandi')
            })
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
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        // minWidth: 800,
        // minHeight: 500,
        webPreferences:{
            preload:path.join(__dirname, './preload.js')
        },
        title:'Main',
        show:false
    })
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:3000/main')
    // mainWindow.loadURL(`${startUrl}#/main`)
    // const mainMenu = Menu.buildFromTemplate(mainTemplate);
    // Menu.setApplicationMenu(mainMenu);

    mainWindow.on('ready-to-show', ()=>{
        mainWindow.show()
        mainWindow.webContents.send('user', JSON.stringify({username:user.username, isadmin:user.isadmin}));
    })
}

// login pencersi
function createLoginWindow(){
    loginWindow = new BrowserWindow({
        width: 400,
        height: 600,
        resizable:false,
        webPreferences:{
            preload:path.join(__dirname, './preload.js'),
        },
        title:'Login',
        backgroundColor:' #2f303f',
        show:false
    })

    // loginWindow.webContents.openDevTools()
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


