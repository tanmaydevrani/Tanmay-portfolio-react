import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { useDispatch } from 'react-redux';
import { setButtonPros } from '../features/button/buttonSlice';

function Home() {
  return (
    <div className='container mt-10'>
      <div className='row h-full'>
        <div className='col-md-6 flex items-start flex-col justify-center'>
          <h1 className='!text-[50px] !font-black m-0'>Hi, I'm Tanmay Devrani</h1>
          <TypeAnimation
            sequence={[
              'Frontend Developer',
              1000,
              'UI/UX Designer',
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '30px', display: 'inline-block' }}
            repeat={Infinity}
            className='dark:text-white'
          />
          <p className='text-gray-500'>
            a passionate Frontend Developer crafting sleek, high-performance web applications.
            Specializing in React, Tailwind, and modern JavaScript, I turn ideas into engaging, responsive user experiences.
          </p>
          
        </div>
        <div className='col-md-6 flex justify-center items-center'>
            <div className='max-w-[350px] rounded-full overflow-hidden'>
              <img src='src/assets/img/tanmay.jpg'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
