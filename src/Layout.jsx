import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    
    <Outlet/>
    </>
  )
}

export default Layout
