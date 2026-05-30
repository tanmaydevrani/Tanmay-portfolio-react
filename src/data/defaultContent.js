export const defaultSettings = {
  name: "Tanmay Devrani",
  tagline: "Senior Frontend Engineer",
  heroDescription:
    "Transforming complex product requirements into blazing-fast, pixel-perfect web applications. 5+ years delivering scalable React solutions used by thousands daily.",
  email: "tanmaydevrani2@gmail.com",
  phone: "+91 7011372156",
  location: "New Delhi, India",
  github: "https://github.com/tanmaydevrani",
  linkedin: "https://in.linkedin.com/in/tanmaydevrani",
  resumeUrl: "/TanmayCv.pdf",
};

export const defaultAbout = {
  bio: [
    "I'm Tanmay Devrani, a Senior Frontend Engineer with 5+ years of hands-on experience building production-grade React applications used by thousands of users daily.",
    "Currently at Shipway by Unicommerce, I architect and deliver end-to-end frontend solutions — from leading a complex migration of a legacy CS-Cart/PHP platform to a modern React + Next.js stack, to mentoring junior engineers and establishing team-wide coding standards.",
    "My core philosophy: performance is a feature. I obsess over Core Web Vitals, bundle optimization, and writing code that's not just functional but maintainable and scalable at speed.",
    "Open to Senior Frontend / Lead Frontend roles in Europe (Germany, UK) and remote opportunities worldwide.",
  ],
  skills: {
    development: ["HTML5", "CSS3", "JavaScript (ES2024)", "TypeScript", "React", "Next.js", "Redux Toolkit", "jQuery", "Tailwind CSS", "Bootstrap"],
    tools: ["Git", "GitHub", "Bitbucket", "Jira", "Vite", "Webpack", "VS Code"],
    design: ["Figma", "Adobe XD"],
  },
  education: [
    {
      degree: "Bachelor of Computer Applications",
      institution: "IEC University",
      year: "2016 – 2019",
      location: "Himachal Pradesh, India",
    },
  ],
};

export const defaultExperience = [
  {
    id: "1",
    order: 1,
    title: "Frontend Developer",
    company: "Shipway by Unicommerce",
    duration: "February 2023 – Present",
    isCurrent: true,
    description: [
      "Architecting and delivering end-to-end frontend solutions for a logistics SaaS platform serving thousands of e-commerce sellers daily.",
      "Leading a full-scale migration of the legacy CS-Cart/PHP application to a modern React + Next.js stack with Node.js API integration.",
      "Building and maintaining a component library that improved development velocity by 40% across the team.",
      "Mentoring a junior frontend developer through code reviews, pair programming, and architectural guidance.",
      "Improved Core Web Vitals scores across key dashboards — LCP reduced by 35%, CLS by 60%.",
    ],
    techStack: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "2",
    order: 2,
    title: "Frontend Developer",
    company: "Koenig Solutions",
    duration: "October 2021 – February 2023",
    isCurrent: false,
    description: [
      "Led all frontend development for a global IT training platform — building modern, responsive interfaces used by learners across 50+ countries.",
      "Delivered multiple feature-complete SPAs using React, Redux, and Tailwind CSS from design mockup to production.",
      "Established coding standards and component conventions adopted across the frontend team.",
      "Mentored a junior developer through structured code reviews and technical guidance.",
    ],
    techStack: ["React", "Redux", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "3",
    order: 3,
    title: "Web Designer",
    company: "GIP Infosystems Pvt. Ltd.",
    duration: "September 2020 – October 2021",
    isCurrent: false,
    description: [
      "Built responsive, production-ready UIs for government and enterprise clients using HTML, CSS, JavaScript, jQuery, and Bootstrap.",
      "Contributed to prestigious Ministry of Defence projects — Aero India Exhibition and DefExpo — developing complete, performance-optimized panels used at national-level events.",
      "Worked closely with the design team using Adobe XD to translate wireframes into functional interfaces with pixel precision.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Adobe XD"],
  },
];

export const defaultProjects = [
  {
    id: "pahadi-pinch",
    order: 1,
    title: "Pahadi Pinch",
    description: "A modern e-commerce web application for authentic Pahadi (Himalayan) food products — bringing the flavors of the mountains to doorsteps across India.",
    longDescription: "Pahadi Pinch is a full-featured e-commerce platform built to showcase and sell authentic Himalayan food products. The app delivers a clean, fast, and mobile-first shopping experience with smooth product browsing, categorization, and a polished UI that builds trust with customers.",
    image: "/pahadipinch.png",
    liveUrl: "https://pahadi-pinch.vercel.app/",
    githubUrl: "",
    techStack: ["React", "Tailwind CSS", "JavaScript", "Vercel"],
    highlights: [
      "Mobile-first responsive design optimized for all screen sizes",
      "Fast product browsing with category filters and search",
      "Clean, trust-building UI tailored to food e-commerce",
      "Deployed on Vercel with CI/CD pipeline",
    ],
    featured: true,
    category: "E-Commerce",
  },
];
