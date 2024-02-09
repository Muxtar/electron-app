import React from "react";
import { useState } from "react";
import '../static/css/Main.css';

export default function Main(){
    const [user, setUser] = useState({username:'', password:''});
    
    window.USER.download((event, data)=>{
        setUser(JSON.parse(data))
        // data = JSON.parse(data)
        // console.log(data)
    })
    return(
        <div className="blog1">
            <header>
                <div className="user-about">
                    <div className="username">{user.username}</div>
                </div>
            </header>
            <div className="body">
                <div className="chat"></div>
            </div>
        </div>
    )
}