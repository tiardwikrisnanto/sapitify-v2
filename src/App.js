
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Login from './component/Conten/Login.js';
import Home from './home/Home.js';


function App() {

  return (
    <Routes>
      <Route path={'/'} element={<Home />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/*' element={<p>Error Not Found</p>}></Route>
    </Routes>


  );
}

export default App;
