import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import  Header from './components/Header.js'
import Body from "./components/Body.js";
import { createBrowserRouter , RouterProvider,Outlet } from "react-router-dom";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestrauantMenu from "./components/RestrauantMenu.js";
import Usercontxt from "./Utils/Usercontxt.js";
import { Provider } from "react-redux";
import AppStore from "./Utils/AppStore.js";
import Cart from "./components/Cart.js";

const Grocer =lazy(()=>import("./components/Grocery.js"));

const AppLayout=()=>{

  const [UserName , setUserName] = useState();
  useEffect(()=>{
    const data={
      name:"satya"
    };
    setUserName(data.name)
  },[])

return(
  <Provider store={AppStore}>
   <Usercontxt.Provider value={{loggedIn : UserName , setUserName}} >  
     <div>
        <Header/>
        <Outlet/>
     </div>
   </Usercontxt.Provider> 
  </Provider> 
    )
}

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
           {
                path:"/",
                element:<Body/>
           },
           {
            path:"/Grocery",
            element:<Suspense fallback={<h1>Loading...</h1>}><Grocer/></Suspense>
           },
           {
            path:"/About",
            element:<About/>
           },

           {
            path:"/Contact",
            element:<Contact/>
          },

          {
            path:"/restrauMenu/:resId",
            element:<RestrauantMenu/>
          },

          {
            path:"/cart",
            element:<Cart/>
          }
        ],

        errorElement:<Error/>
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);   