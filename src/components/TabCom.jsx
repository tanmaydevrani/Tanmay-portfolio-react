import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabCom() {

  const tabListing=[
    {
      eventKey:"languages",
      title:"Development Skills",
      tabClassName:"px-3 text-black font-[14px] py-1 !rounded-xl bg-gray-200 [&.active]:!bg-black [&.active]:!text-white",
      content:[
        {name:"HTML", icon:(<i className="devicon-html5-plain text-orange-400"></i>)},
        {name:"CSS", icon:(<i className="devicon-css3-plain text-blue-500"></i>)},
        {name:"JavaScript", icon:(<i className="devicon-javascript-plain text-yellow-300"></i>)},
        {name:"React", icon:(<i className="devicon-react-original text-blue-500"></i>)},
        {name:"Next.js", icon:(<i className="devicon-nextjs-original-wordmark !text-[17px]"></i>)},
        {name:"Redux Toolkit", icon:(<i class="devicon-redux-original text-purple-600"></i>)},
        {name:"jQuery", icon:(<i className="devicon-jquery-plain text-blue-800"></i>)},
        {name:"Tailwind CSS", icon:(<i className="devicon-tailwindcss-original text-blue-600"></i>)},
        {name:"Bootstrap", icon:(<i className="devicon-bootstrap-plain text-purple-800"></i>)},
      ]
    },
    {
      eventKey:"tools",
      title:"Tools / Platforms",
      tabClassName:"px-3 text-black font-[14px] py-1 !rounded-xl bg-gray-200 [&.active]:!bg-black [&.active]:!text-white",
      content:[
        {name:"Git", icon:(<i className="devicon-git-plain text-gray-600"></i>)},
        {name:"GitHub", icon:(<i className="devicon-github-original text-black"></i>)},
        {name:"Bitbucket", icon:(<i className="devicon-bitbucket-original text-blue-700"></i>)},
        {name:"Jira", icon:(<i class="devicon-jira-plain text-blue-700"></i>)},
      ]
    },
    {
      eventKey:"design",
      title:"Design / UI",
      tabClassName:"px-3 text-black font-[14px] py-1 !rounded-xl bg-gray-200 [&.active]:!bg-black [&.active]:!text-white",
      content:[
        {name:"Figma", icon:(<i className="devicon-figma-plain text-orange-600"></i>)},
        {name:"Adobe Xd", icon:(<i className="devicon-xd-plain text-pink-700"></i>)},
      ]
    }
  ]


  return (
    <Tabs
      defaultActiveKey="languages"
      transition={false}
      id="noanim-tab-example"
      className="mb-4 mt-4 w-fit m-auto !bg-gray-100 px-1 py-1 rounded-2xl gap-2"
    >
      {tabListing.map((item)=>(
        <Tab 
          eventKey={item.eventKey} 
          title={item.title} 
          className='bg-gray-50 rounded-2xl p-3 mt-3'
          tabClassName={item.tabClassName}>
            <ul className='flex gap-4 text-[14px] p-0 m-0 w-fit m-auto flex-wrap justify-center'>
              {item.content.map((langs, i)=>(
                <li key={i} className='py-1 px-3 gap-1 text-nowrap flex items-center bg-white rounded-xl outline-gray-200 outline-1'>
                  {langs.icon}
                  {langs.name}
                </li>
              ))}
            </ul>
        </Tab>
      ))}
    </Tabs>
  );
}

export default TabCom;