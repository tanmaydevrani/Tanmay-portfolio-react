import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import ThemeBtn from '../ThemeBtn';

function Header() {

    const navItems = [
        {
            name:'Home',
            link:'/'
        },
        {
            name:'About',
            link:'/about'
        },
        {
            name:'Experience',
            link:'/experience'
        },
        {
            name:'Projects',
            link:'/projects'
        },
        {
            name:'Blog',
            link:'/blog'
        },
        {   
            name:'Contact',
            link:'/contact'
        }
    ]
  return (
    <div className='sticky top-0'>
        <Navbar expand="lg" className="sticky top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 rounded-xl py-3 px-4 bg-background/20 backdrop-blur-sm border-[0.5px] border-white/10">
            <Navbar.Brand href="#home"><Logo/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto gap-1">
                {navItems.map((nav)=>(
                   <NavLink
                    as={NavLink}
                    to={nav.link}
                    key={nav.link}
                    className={({ isActive }) =>
                        `!text-[14px] transition-all duration-300 hover:!text-black hover:!bg-gray-100 px-3 py-2  dark:hover:!bg-[#2f2961] dark:hover:!text-white text-gray-700 !no-underline rounded ${
                        isActive ? "!bg-gray-100 !text-black dark:!bg-[#2f2961] dark:!text-white dark:hover:!bg-[#2f2961] dark:hover:!text-white" : ""
                        }`
                    }
                    >
                   {nav.name}
                 </NavLink>                 
                ))}
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
