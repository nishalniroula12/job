import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Job from '../pages/Job';

const Mainroute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/job' element={<Job/>}/>

        </Routes>
      
    </div>
  )
}

export default Mainroute
