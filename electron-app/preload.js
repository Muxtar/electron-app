const { ipcRenderer, contextBridge } = require('electron');


// login
contextBridge.exposeInMainWorld('LOGIN', {
    send: (data)=>{ 
        ipcRenderer.send('login', data);
        console.log('login isledi') 
    }
})

contextBridge.exposeInMainWorld('EXIT', {
    send: (data)=>{ipcRenderer.send('exit', data);}
})

contextBridge.exposeInMainWorld('DOWNLOAD', {
    download: (data)=>ipcRenderer.on('message', (data))
})


// main
contextBridge.exposeInMainWorld('USER', {
    download: (data) =>{
        console.log('isledi', data)
        ipcRenderer.on('user', data)
    }
})