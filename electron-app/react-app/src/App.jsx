import React from "react";
// import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Main from './pages/main';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />}/>
      </Routes>
    </BrowserRouter>
  //  <HashRouter>
  //     <Routes>
  //         <Route path='/' element={<Login />} />
  //         <Route path='/main' element={<Main />}/>
  //     </Routes>
  //   </HashRouter>
  );
}

export default App;
