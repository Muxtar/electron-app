import React from 'react';
import { useState, useRef, useEffect } from 'react'
import '../static/css/Login.css';

function Login() {
  const [username, setUsername] = useState('muxtar');
  const [password, setPassword] = useState('1992');
  const [showPassword, setShowPassword] = useState(false);
  const [typePassword, setTypePassword] = useState("password");

  const usernameInp = useRef();
  const passwordInp = useRef();
  const divError = useRef();

  function show(){
    setShowPassword(!showPassword);
    typePassword == 'password' ? setTypePassword('text') : setTypePassword('password');
  }
  
  // send data to back-end(node.js)
  function sendData(event){
    event.preventDefault();
    window.LOGIN.send({username:username, password:password});
    
    window.DOWNLOAD.download((event, data)=>{
      if(data == 'error'){
        divError.current.children[0].style.backgroundColor = "tomato";
        divError.current.children[0].innerHTML = 'Username or Password incorrect';
        divError.current.style.left = '0px'
      }else if(data == 'server-error'){
        divError.current.children[0].style.backgroundColor = "red";
        divError.current.children[0].innerHTML = 'Server not';
        divError.current.style.left = '0px'
      }
      setTimeout(()=>{
        divError.current.style.left = '-250px'
      }, 5000)
    })
  }

  return (
    <div className="Login">
      <header className="App-header">
        <div className='error' ref={divError}>
          <p>Username or Password incorrect</p>
        </div>
      </header>
      <div className="form">
        <div className='main'>
          <form action="" onSubmit={sendData}>
            <div className='group'>
              <h2 style={{color:"rgb(200, 200, 200)", textAlign:'center', marginBottom:'30px'}}>Login</h2>
            </div>
            <div className='group icon'>
              <i className="fa-solid fa-user"></i>
              <input 
                  type="text" 
                  placeholder='Username' 
                  ref={usernameInp} 
                  onInput={()=>{
                    setUsername(usernameInp.current.value);
                  }} 
                  value={username}
              />
            </div>
            <div className='group icon'>
              <i className="fa-solid fa-key"></i>
              {password == '' ? null : (showPassword ? <i className="fa-solid fa-eye-slash" onClick={show}></i> : <i className="fa-solid fa-eye" onClick={show}></i>)}
              <input 
                  type={typePassword} 
                  placeholder='Password' 
                  ref={passwordInp} 
                  onInput={()=>{
                    setPassword(passwordInp.current.value)
                  }} 
                  value={password}
              />
            </div>
            <div className='group'>
              <button>Login
                <i className="fas fa-sign-in"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
