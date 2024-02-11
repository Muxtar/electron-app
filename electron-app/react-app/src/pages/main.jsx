import React from "react";
import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink } from 'react-router-dom'
import '../static/css/Main.css';


function Notifaction({refNot, not, setNot}){
  function showNotifaction(){
    setNot(!not);
    if(not){
      refNot.current.style.right = '0px';
    }else{
      refNot.current.style.right = '-355px';
    }
  }
  return(
    <div className="notifaction-screen" ref={refNot}>
      <div className="header">
        <i class="fa fa-close" onClick={showNotifaction}></i>
      </div>
    </div>
  )
}

export default function Main(){
    const [user, setUser] = useState({username:'', token:'', isadmin:false});
    const [not, setNot] = useState(true)
    const notifaction = useRef();

    window.USER.download((event, data)=>{
        setUser(JSON.parse(data))
    })

    function showNotifaction(){
      setNot(!not)
      if(not){
        notifaction.current.style.right = '0px';
      }else{
        notifaction.current.style.right = '-355px';
      }
    }

    return(
        <div className="main-page">
            <header>
              <div className="program-name">
                Deep Analisys
              </div>
                <div className="user">
                    <div className="notifaction">
                      <div className="icons deactive">
                        <i className="fa-solid fa-message"></i>
                        <p className="message">no active</p>
                      </div>
                      {user.isadmin ? 
                        <div className="icons deactive">
                          <i className="fas fa-tasks"></i>
                          <p className="message">no active</p>
                        </div>
                      :null}
                      {user.isadmin ? 
                        <div className="icons deactive">
                          <i className="fa-solid fa-users"></i>
                          <p className="message">no active</p>
                        </div>
                      : null}
                      <div className="icons" onClick={showNotifaction}>
                        <i className="fa-solid fa-bell"></i>
                        <p className="message">Notifaction</p>
                      </div>

                      {user.isadmin ? 
                        <NavLink className="icons" to='edit-sql'>
                          <i className="fa-solid fa-database"></i>
                          <p className="message">Sql work</p>
                        </NavLink>
                      :null}
                      
                      <div className="icons">
                        <i class="fas fa-sign-out" onClick={()=>{
                            window.EXIT.send();
                        }}></i>
                        <p className="message">Exit</p>
                      </div>
                      <div className="icons username">
                        <i className="fa-solid fa-user"></i>
                        <p className="message">{user.username}</p>
                      </div>
                    </div>
                </div>
            </header>
            <div className="search">
                <div className="content">
                  <Outlet />
                  <Notifaction refNot={notifaction} not={not} setNot={setNot} />
                </div>
            </div>
        </div>
    )
}