const { ipcRenderer, contextBridge } = require('electron');

// login
contextBridge.exposeInMainWorld('LOGIN', {
    send: (data)=>{ 
        ipcRenderer.send('login', data);
    }
})

contextBridge.exposeInMainWorld('EXIT', {
    send: ()=>{ipcRenderer.send('exit', 'exit');}
})

contextBridge.exposeInMainWorld('DOWNLOAD', {
    download: (data)=>ipcRenderer.on('message', (data))
})

// main
contextBridge.exposeInMainWorld('USER', {
    download: (data) =>{
        ipcRenderer.on('user', data)
        console.log(data)
    }
})

// check sql
contextBridge.exposeInMainWorld('SQLQUERY', {
    send : (sqlQuery) => {
        ipcRenderer.send('sqlQuery', sqlQuery);
    }
})