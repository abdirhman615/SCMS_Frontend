import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import { Route, Routes } from 'react-router-dom'



import {Faculty} from "./components/FacultyPage/Faculty";
import {Department} from "./departmentPage/department";
import {Class} from "./components/ClassPage/Class";
import {Student} from "./components/StudentsPage/Students";




// import Gallery from "./components/GalleryPage/Gallery";
// import Home from "./components/HomePage/Home";
// import About from "./components/AboutPage/About";
// import Contact from "./components/ContactPage/Contact";
// import Houses from "./components/HousesPage/Houses";
// import ImagesFolder from "./components/HousesPage/ImagesFolder";
// import Users from "./components/UsersPage/Users";
// import Login from "./Login/login";
// import Logout from "./Login/logout";
import { useUserContext } from './ContextApi/UserContext'
import Whitescreen from "./Login/whitescreen";

function app() {
  // const {isLogin}= useUserContext()
  // console.log(isLogin)
  return (
    <>

      {/* <Dashboard/> */}
      <Routes>

        {/* <Route path='/' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='*' element={<Whitescreen/>} /> */}

        {/* {isLogin && <Route path='Dashboard' element={<Dashboard />}> */}
        {/* <Route path='Dashboard' element={<Dashboard />}> */}
        <Route path='/' element={<Dashboard />}>
          <Route path='Faculty' element={<Faculty />} />
          <Route path='Department' element={<Department />} />
          <Route path='Class' element={<Class />} />
          <Route path='Student' element={<Student />} />
          {/* <Route path='client' element={<Clients />} />
          <Route path='houses' element={<Houses />} />
          <Route path='images/:id/:Type' element={<ImagesFolder />} />
          
          <Route path='home' element={<Home />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='users' element={<Users />} /> */}
        </Route>
        {/* </Route>} */}

      </Routes>

    </>
  );
}

export default app;