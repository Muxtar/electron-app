import React from "react";
import { useState } from "react";
import '../static/css/Main.css';

export default function Main(){
    const [user, setUser] = useState({username:'', token:'', isadmin:false});
    
    window.USER.download((event, data)=>{
        setUser(JSON.parse(data))
    })
    return(
        <div className="main-page">
            <header>
                <div className="user">
                    <div className="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div className="username">
                        <p>{user.username}</p>
                    </div>
                    <div className="user-about">
                        <div className="notifaction">
                            <i class="fa-solid fa-message"></i>
                            {user.isadmin ? <i class="fas fa-tasks"></i> : null }
                            {user.isadmin ? <i class="fa-solid fa-users"></i> : null}
                            <i class="fa-solid fa-bell"></i>
                            <i class="fas fa-sign-out" onClick={()=>{
                                window.EXIT.send();
                            }}></i>
                        </div>
                    </div>
                </div>
            </header>
            <div className="body">
                {/* <div className="chat">{user.username}</div> */}
            </div>
        </div>
    )
}