import {Outlet, useNavigate } from "react-router-dom"
import About from "./About"
import PasswordComponets from "./PasswordComponets"
import homeImage from '../assets/image/homepage.jpg'

function Home() {
  const navigate = useNavigate()
  return (
   <>
  
<div className="relative bg-gray-100">
  <div
    className="w-full h-screen bg-no-repeat bg-cover bg-center mx-auto "
    style={{
      backgroundImage: `url(${homeImage})`,
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="p-6 text-center max-w-2xl">
        <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
          Discover Stories That Inspire, Inform, and Delight.
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Your daily dose of fresh content, curated just for you. Explore
          insights, trends, and ideas that matter.
        </p>
        
        <button className="bg-transparent border border-white rounded-md px-4 py-2 hover:bg-black text-white mx-2" onClick={()=> navigate('/blogs')} >Blogs</button>
        <button className="bg-transparent border border-white rounded-md px-4 py-2 hover:bg-black text-white" onClick={()=> navigate('/createBlog')}>createBlog</button>

      </div>
    </div>
  </div>
</div>

     <About/>
    
         
 

   </>
   

  )
}

export default Home