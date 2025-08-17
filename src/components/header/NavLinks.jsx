import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

import React from 'react'

function NavLinks({className="", divClassName=""}) {
  return (
    <div className={`${divClassName}`}>
       {navItems.map((nav)=>(
            <NavLink
            as={NavLink}
            to={nav.link}
            key={nav.link}
            className={({ isActive }) =>
                `${className} !text-[14px] transition-all duration-300 hover:!text-black hover:!bg-gray-100 px-3 py-2  dark:hover:!bg-[#2f2961] dark:hover:!text-white text-gray-700 !no-underline rounded ${
                isActive ? "!bg-gray-100 !text-black dark:!bg-[#2f2961] dark:!text-white dark:hover:!bg-[#2f2961] dark:hover:!text-white" : ""
                }`
            }
            >
            {nav.name}
            </NavLink>                 
        ))}
    </div>
  )
}

export default NavLinks
