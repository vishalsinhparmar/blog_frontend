import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout'
import Home from './Componets/Home'
import About from './Componets/About'
import Blog from './Componets/Blog'
import DetailBlog from './Componets/DetailBlog'
import Createblog from './Componets/Createblog'
import BLoglistUser from './Componets/BLoglistUser'
import SignUp from './Componets/Auth/SignUp'
import SignIn from './Componets/Auth/SignIn'
import ForgotPassword from './Componets/Auth/Forgottepassword'
import NewPassword from './Componets/Auth/Newpassword'
import VerifyuserBymail from './Componets/Auth/VerifyuserBymail'
import User from './Componets/User'

createRoot(document.getElementById('root')).render(
  <StrictMode>
         <Router>
          <Routes>
            <Route path='/'  element = {<Layout/>} >
              <Route index element={<Home/>}/>
                 <Route path="About" element={<About/>}/> 
                 <Route path="SignUp" element={<SignUp/>}/>

                 
                 <Route path="SignIn" element={<SignIn />}/> 
                 <Route path="/blogs" element={<Blog/>}/> 

               
                 <Route path="/BlogDetail/:id" element={<DetailBlog/>}/> 
                 <Route path="/createBlog/:id" element={<Createblog/>}/> 
                 <Route path="/createBlog" element={<Createblog/>}/> 

                 <Route path="/user" element={<User/>}/> 
                 <Route path="/userBloglist/:id" element={<BLoglistUser/>}/> 
                 <Route path="/ForgottePassword" element={<ForgotPassword/>}/> 
                 <Route path="/newPassword/:token" element={<NewPassword/>}/> 
                 <Route path="/newPassword" element={<NewPassword/>}/> 

                 <Route path="/verifyemail" element={<VerifyuserBymail/>}/> 
                 <Route path="/verifyemail/:token" element={<VerifyuserBymail/>}/>


                 
                 






               </Route>
           
            
          
           </Routes>
        </Router>
  </StrictMode>,
)
