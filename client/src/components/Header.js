import React from 'react'
import './header.css'
import Avatar from '@mui/material/Avatar';


const Header = () => {
  return (
    <>
     <header>
        <nav><h1>Waseem Cloud</h1>
        <div className='avatar'>
          <Avatar style={{background: "Blue"}}>W</Avatar>

        </div></nav>
      
        </header>  
    </>
  )
}

export default Header
