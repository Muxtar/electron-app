import React from "react";
// import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Main from './pages/main';
import SqlEdit from "./pages/sqlEdit";
import Analisys from "./pages/analisys";
import Graph from "./pages/graph";
import Treejsx from "./pages/tree";
import './App.css';
import TableAnalisys from "./pages/tableAnalisys";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />}>
            <Route path="analisys" element={<Analisys />}>
              <Route path="graph" element={<Graph />}/>
              <Route path="tree" element={<Treejsx />}/>              
              <Route path="table" element={<TableAnalisys />}/>              
            </Route>
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
