import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Job from '../pages/Job';
import Company from '../pages/Company';
import Alljob from '../pages/Alljob';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Updateprofile from '../pages/Updateprofile';
import Apply from '../pages/Apply';
import Notification from '../pages/Notification';
import Protectedroute from '../components/Protectedroute';

const Mainroute = () => {
  return (
    <div>
         <Routes>

{/* ===================================== */}
{/* PUBLIC ROUTES */}
{/* ===================================== */}

<Route path="/" element={<Home />} />


<Route path="/job" element={<Job />} />

<Route path="/company" element={<Company />} />

<Route path="/alljob" element={<Alljob />} />

<Route path="/login" element={<Login />} />



{/* ===================================== */}
{/* LOGIN REQUIRED */}
{/* ===================================== */}

<Route element={<Protectedroute />}>

  <Route
    path="/profile"
    element={<Profile />}
  />

  <Route
    path="/updateprofile"
    element={<Updateprofile />}
  />

  <Route
    path="/apply/:id"
    element={<Apply />}
  />

  <Route
    path="/notification"
    element={<Notification />}
  />

</Route>


{/* ===================================== */}
{/* EMPLOYER ONLY */}
{/* ===================================== */}
<Route>
  <Route path='/allcompany' element={<Allcompany/>}/>

</Route>

  {/* Put employer pages here */}

  {/* 
  <Route
    path="/employer/applicants"
    element={<Applicants />}
  />
  */}


</Routes>
    </div>
  )
}

export default Mainroute
