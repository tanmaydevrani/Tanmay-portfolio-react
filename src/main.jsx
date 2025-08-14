import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home,About,Experience,Projects,Blog,Contact} from "./pages/index.js"
import './index.css'
import { Provider, useSelector } from 'react-redux';
import {store} from "./store/store.js"


function ThemeWrapper({children}){
  const theme = useSelector((state)=>state.theme.theme)

  useEffect(()=>{
    document.documentElement.classList.remove('light', 'dark');
    if(theme === "dark"){
     document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.add('light')
    }
  },[theme]);

  return children;
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"experience",
        element:<Experience/>
      },
      {
        path:"projects",
        element:<Projects/>
      },
      {
        path:"blog",
        element:<Blog/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <RouterProvider router={router}/>
      </ThemeWrapper>
    </Provider>
  </StrictMode>,
)
