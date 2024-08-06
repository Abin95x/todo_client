import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Home from '../pages/Home/Home'
import ProjectView from '../pages/ProjectView/ProjectView'
import Public from './Public'
import Protect from './Protect'


const UserRoute = () => {
  return (

    <Routes>
      <Route path='/' element={<Public><Login /></Public>} />
      <Route path='/signup' element={<Public><Signup /></Public>} />
      <Route path='/home' element={<Protect><Home /></Protect>} />
      <Route path='/projectview/:projectId' element={<Protect><ProjectView /></Protect>} />
    </Routes>
  )
}

export default UserRoute