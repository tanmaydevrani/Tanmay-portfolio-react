import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import {Button, SocialMedia, Cards, TabCom} from '../components/index';
import ContactForm from '../components/froms/ContactForm';

function Home() {
  
  return (
    <>
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
            <div className='flex gap-3'>
              <Button className='d-flex gap-2 bg-black text-white  hover:!bg-gray-700 dark:!bg-gray-100 dark:!text-black dark:hover:!bg-gray-300'>
                  View my work
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" className='fill-white dark:fill-black' viewBox="0 0 24 24" width="16"><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/></svg>
                </Button>
                <Button className='d-flex gap-2 bg-white !text-black border-2 border-gray-200 hover:!bg-gray-200 dark:!bg-gray-800 dark:!text-white dark:hover:!g-gray-900 dark:hover:!text-gray-900'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='dark:fill-white dark:hover:!fill-black fill-black' viewBox="0 0 24 24" width="11"><g id="_01_align_center" dataName="01 align center"><path d="M12.032,19a2.991,2.991,0,0,0,2.122-.878L18.073,14.2,16.659,12.79l-3.633,3.634L13,0,11,0l.026,16.408-3.62-3.62L5.992,14.2l3.919,3.919A2.992,2.992,0,0,0,12.032,19Z"/><path d="M22,16v5a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V16H0v5a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V16Z"/></g></svg>
                  Resume
                </Button>
            </div>
            <SocialMedia/>
          </div>
          <div className='col-md-6 flex justify-center items-center'>
              <div className='max-w-[350px] rounded-full overflow-hidden'>
                <img src='src/assets/img/tanmay.jpg'/>
              </div>
          </div>
        </div>
      </div>

      <div className='container-fluid bg-gray-50 mt-5 dark:bg-transparent'>
      <div className='row p-5'>
          <div className='col-md-12'>
            <h1 className='m-0 text-center !font-black mb-3'>My Projects</h1>
            <div className='grid grid-cols-3 gap-4 mb-5'>
              <Cards
                title="Project 1"
                description="Dummy Text"
                />
              <Cards title="Project 2"/>
              <Cards title="Project 3"/>
            </div>
            <Button className='d-flex gap-2 m-auto bg-white !text-black border-2 border-gray-200 hover:!bg-gray-200 dark:!bg-gray-800 dark:!text-white dark:hover:!g-gray-900 dark:hover:!text-gray-900'>
              View all Projects 
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" className='dark:fill-white fill-black' viewBox="0 0 24 24" width="16"><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/></svg>
            </Button>
          </div>
        </div>
      </div>

      <div className='p-10 max-w-6xl m-auto'>
        <h1 className='m-0 text-center !font-black mb-1'>Technical Skills</h1>    
        <h6 className='text-center'>My expertise across various technologies and tools</h6>
          <TabCom/>
      </div>

      <div className='container-fluid bg-gray-50 mt-5 dark:bg-transparent p-5'>
        <h1 class="m-0 text-center !font-black mb-1">Get In Touch</h1>
        <h5 className='mb-4 text-center !font-normal !text-gray-500'>Have a project in mind or want to collaborate? I'd love to hear from you!</h5>
        <ContactForm/>
      </div>
    </>
  )
}

export default Home
