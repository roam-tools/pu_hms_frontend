import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

export const Footer = () => {
  return (
    <footer>
      &copy; {moment().format("YYYY")} Pentecost University. All Rights Reserved<br />
      Powered By: ROAM Labs
      {/* <br /> */}
      {/* <NavLink to="/admin/login">Admin</NavLink> */}
    </footer>
  )
}
