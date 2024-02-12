'use strict';

const express = require('express');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const {logRequest} = require('./middleware.js')
// const xhttp = new XMLHttpRequest();


const app = express();
const PORT = 8080;
const HOST = '127.0.0.1';

const secretKey = '109342!(&(()))_+awqxbcvasapoqwpquzha)*^^%#@$4724';

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req, res, next)=>{
    logRequest(req, res, next, HOST, PORT);
})

function authenticated(paramUser = {username:'muxtar', password:'1992'}) {
    // this function return users Object, if user is exists else return undefined
    
    const fileName = 'users.json';
    try{
        const jsonData = fs.readFileSync(fileName, 'utf8');
        let data = JSON.parse(jsonData).users;
        return data.filter(element => {
            if(element.username == paramUser.username && element.password == paramUser.password){
                return element;
            }
        })[0];
    }
    catch(error){
        // if file not exists create an empty file
        let jsonData = {users:[]};
        jsonData = JSON.stringify(jsonData);
        fs.writeFile('users.json', jsonData, (error)=>{
            return undefined;
        })
    }
}

const server = http.createServer(app);

app.post('/login', (req, res)=>{
    const {token, username, password} = req.body;
    const user = authenticated({username:username, password:password});
    if(user && token == secretKey){
        user['secretKey'] = secretKey;
        console.log(user)
        res.status(200).send({message:'success', user:user})
    }else{
        res.status(404).send({message:'error'})
    }
    
})

server.listen(PORT, ()=>{
    console.log('Server run !!')
})