import React from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import Logo from '../Assets/Logo.png'
import { Logout } from '@mui/icons-material'
import { Divider } from '@mui/material'


function Navbar() {
  return (
    
    <div className='navbar'>
      <img style ={{height:"60px",width:"60px",marginLeft:"30%",marginTop:"30px"}}src={Logo}/>
  
       {
        SidebarData.map((val,key) => {
          return (
            <ul className='list' key={key}>
              <span>{val.icon} </span>
              <span>
              <NavLink
               className={({ isActive }) =>
               isActive ? 'font-bold' : 'font-thin'
             }
              style={{color:"#7289DA",textDecoration:"none"
            ,marginLeft:"3px",verticalAlign:"middle"}} end to={val.path}>{val.title}</NavLink></span>

            </ul>
          )
        })
       }

      
        </div>
        
      
  )
}

export default Navbar