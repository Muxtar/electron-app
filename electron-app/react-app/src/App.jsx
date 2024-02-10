import React from "react";
// import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Main from './pages/main';
import Treejsx from "./pages/tree";
import Graph from "./pages/graph";
import SqlEdit from "./pages/sqlEdit";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />}>
            <Route path='tree' element={<Treejsx />} index={true} />
            <Route path='graph' element={<Graph />}/>
            <Route path="edit-sql" element={<SqlEdit/>} />
          </Route>
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
