import React from 'react'
import { Outlet } from "react-router-dom";
import ButtonAppBar from './navbar'

function Layout() {
  return (
    <div>
      <ButtonAppBar/>
      <Outlet/>
    </div>
  )
}

export default Layout
