import React from 'react'
import NavLinks from './header/NavLinks'
import SocialMedia from './SocialMedia'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='border-t border-t-2 border-t-gray-100 px-4 pt-5 pb-2'>
        <div className='grid gap-5 grid-cols-4 mb-4'>
            <div>
                <h6 className='!font-black !text-[18px] dark:!text-white'>Tanmay Devrani</h6>
                <p className='!text-gray-500 !text-sm'>Front-End Developer passionate about crafting modern, responsive, and user-friendly web applications with React, Next.js, and Tailwind CSS.</p>
            </div>
            <div>
                <h6 className='!font-black !text-[18px] dark:!text-white'>Quick Links</h6>
                <ul className='m-0 p-0 text-[14px] leading-loose'>
                    <li>
                        <Link to="/about" className='!no-underline !text-gray-500'>
                            About me
                        </Link>
                    </li>
                    <li>
                        <Link to="/experience" className='!no-underline !text-gray-500'>
                        Experience
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className='!no-underline !text-gray-500'>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" className='!no-underline !text-gray-500'>
                            Blog
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h6 className='!font-black !text-[18px] dark:!text-white'>Connect</h6>
                <SocialMedia className='!mt-0 footer-svg'/>
            </div>
            <div>
                <h6 className='!font-black !text-[18px] dark:!text-white'>Keyboard Shortcuts</h6>
            </div>
        </div>

        <div className='border-t border-t-2 border-t-gray-100 w-full pt-2 flex justify-between'>
            <p className='m-0 text-gray-500 text-sm'>
                © 2025 Achyut Katiyar. All rights reserved.
            </p>
            <p className='m-0 text-gray-500 text-sm'>
                Built with &hearts; using React & Tailwind
            </p>
        </div>
    </div>
  )
}

export default Footer
