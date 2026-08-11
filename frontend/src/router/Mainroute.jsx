import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Job from '../pages/Job';
import Company from '../pages/Company';
import Alljob from '../pages/Alljob';

const Mainroute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/job' element={<Job/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/alljob' element={<Alljob/>}/> 

        </Routes>
      
    </div>
  )
}

export default Mainroute
