import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Logo';
import ThemeBtn from '../ThemeBtn';
import NavLinks from "./NavLinks"

function Header() {

  return (
    <div className='sticky top-0 z-10'> 
        <Navbar expand="lg" className="sticky top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 rounded-xl py-3 px-4 bg-background/20 backdrop-blur-sm border-[0.5px] border-white/10">
            <Navbar.Brand href="#home"><Logo/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto gap-1">
               <NavLinks/>
            </Nav>
            </Navbar.Collapse>
            <div>
                <ThemeBtn/>
            </div>
        </Navbar>
    </div>
  )
}

export default Header
