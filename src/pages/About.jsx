import React from 'react'

function About() {

  const skills = ["HTML","CSS","JavaScript", "React", "Next Js", "Redux Toolkit", "JQuery", "Tailwind CSS", "Bootstrap"]
  const tools = ["Git", "Github", "Bitbucket", "Jira"]
  const design = ["Figma", "Adobe XD"]

  return (
    <div className='px-4 py-5'>
      <h1 className='m-0 text-center !font-black mb-2'>About</h1>
      <h5 className='mb-4 text-center !font-normal !text-gray-500'>Get to know more about my background and skills</h5>

      <div className='grid grid-cols-2 gap-3'>
        <div>
          <h2 className='!text-2xl !font-bold mb-2'>Who I Am</h2>
          <div className='space-y-4 text-gray-500'>
            <p>
              I'm Tanmay Devrani, a passionate Frontend Developer who loves crafting modern, responsive, 
              and user-friendly web applications. With strong expertise in React, Next.js, Redux Toolkit, Tailwind CSS,
              and Bootstrap, I specialize in creating seamless interfaces that blend clean design with smooth functionality.
            </p>
            <p>
              Alongside development, I work with tools like Git, GitHub, Bitbucket, and Jira,
              and I collaborate closely with designers using Figma and Adobe XD to turn ideas into polished products.
            </p>
            <p>
              I'm always eager to learn new technologies, improve my skills, and contribute to building
              impactful digital experiences that make a difference for users.
            </p>
          </div>
        </div>
        <div>
          <h2 className='!text-2xl !font-bold mb-2'>Skills</h2>
          <h6 className='!font-black'>Development Skills</h6>
          <div className='flex flex-wrap gap-3 mb-5'>
            {skills.map((item)=>(
              <span className='!text-[12px] !font-medium bg-gray-100 py-1 px-2 rounded-2xl'>{item}</span>
            ))}
          </div>
          <h6 className='!font-black'>Tools/Platforms</h6>
          <div className='flex flex-wrap gap-3 mb-5'>
            {tools.map((item)=>(
              <span className='!text-[12px] !font-medium bg-gray-100 py-1 px-2 rounded-2xl'>{item}</span>
            ))}
          </div>
          <h6 className='!font-black'>Design/UI</h6>
          <div className='flex flex-wrap gap-3'>
            {design.map((item)=>(
              <span className='!text-[12px] !font-medium bg-gray-100 py-1 px-2 rounded-2xl'>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='!text-2xl !font-bold mb-3'>Education</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='outline-2 outline-gray-200 rounded-2xl p-4'>
            <div className='mb-5'>
                <h5 className='!text-[18px] !font-black'>Bachelor of Computer Applications</h5>
                <h6 className='!font-black !text-[14px] !text-gray-500'>IEC University</h6>
            </div>
            <div className='flex justify-between'>
              <p className='text-[14px] text-gray-500 m-0'>2016 - 2019</p>
              <p className='text-[14px] text-gray-500 m-0'>Himachal Pradesh, India.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
