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
import Mainlayout from '../components/Mainlayout'
import Dashboard from '../pages/employer/Dashboard';
import Allcompany from '../pages/employer/Allcompany';
import Applicant from '../pages/employer/Applicant';
import View from '../pages/employer/View';
import Employerprofile from '../pages/employer/Employerprofile';
import Alljobs from '../pages/employer/Alljobs';

const Mainroute = () => {
  return (
    <div>
         <Routes>

{/* ===================================== */}
{/* PUBLIC ROUTES */}
{/* ===================================== */}
<Route element={<Mainlayout/>}>
<Route path="/" element={<Home />} />


<Route path="/job" element={<Job />} />

<Route path="/company" element={<Company />} />

<Route path="/alljob" element={<Alljob />} />
<Route path="/login" element={<Login />} />

</Route>




{/* ===================================== */}
{/* LOGIN REQUIRED */}
{/* ===================================== */}

<Route element={<Protectedroute />}>
<Route element={<Mainlayout/>}>

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

</Route>


{/* ===================================== */}
{/* EMPLOYER ONLY */}
{/* ===================================== */}
<Route>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/allcompany' element={<Allcompany/>}/>
  <Route path='/applicant' element={<Applicant/>}/>
  <Route path='/view' element={<View/>}/>

  <Route path='/view/:id' element={<View/>}/>
  <Route path='/profileemploye' element={<Employerprofile/>}/>
  <Route path='/all-job' element={<Alljobs/>}/>

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
