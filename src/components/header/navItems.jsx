export const navItems = [
  { name: "nav.home", link: "/" },
  { name: "nav.about", link: "/about" },
  { name: "nav.experience", link: "/experience" },
  { name: "nav.projects", link: "/projects" },
  { name: "nav.contact", link: "/contact" },
];

export const mobileNavItems = [
  {
    name: "nav.home",
    link: "/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="currentColor">
        <path d="M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z"/>
      </svg>
    ),
  },
  {
    name: "nav.about",
    link: "/about",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="currentColor">
        <path d="M12,12c2.76,0,5-2.24,5-5s-2.24-5-5-5-5,2.24-5,5,2.24,5,5,5Zm0,2c-3.33,0-10,1.67-10,5v2h20v-2c0-3.33-6.67-5-10-5Z"/>
      </svg>
    ),
  },
  {
    name: "nav.projects",
    link: "/projects",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="currentColor">
        <path d="M9.4,16.6L4.8,12l4.6-4.6L8,6l-6,6,6,6,1.4-1.4Zm5.2,0,4.6-4.6-4.6-4.6L16,6l6,6-6,6-1.4-1.4Z"/>
      </svg>
    ),
  },
  {
    name: "nav.contact",
    link: "/contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" fill="currentColor">
        <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1.9,2,2,2h16c1.1,0,2-.9,2-2V6C22,4.9,21.1,4,20,4Zm0,4-8,5L4,8V6l8,5,8-5v2Z"/>
      </svg>
    ),
  },
];
