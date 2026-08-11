import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Job from '../pages/Job';
import Company from '../pages/Company';
import Alljob from '../pages/Alljob';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Updateprofile from '../pages/Updateprofile';

const Mainroute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/job' element={<Job/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/alljob' element={<Alljob/>}/> 
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/updateprofile' element={<Updateprofile/>}/>
            <Route path='/login' element={<Login/>}/>

        </Routes>
      
    </div>
  )
}

export default Mainroute
