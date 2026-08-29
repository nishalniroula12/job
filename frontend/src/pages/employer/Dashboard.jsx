import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'

const Dashboard = () => {
  const [job,setjob] =useState([])
  const [company,setcompany]=useState([])
  const [read,setread] =useState([])

  const fetchall=async()=>{
    try {
      const res =await api.get("/getjob")
      const c =await api.get('')
      
    } catch (error) {
      
    }
  }
  return (
    <div>
      
        <Sidebar/>
       
      
    </div>
  )
}

export default Dashboard
