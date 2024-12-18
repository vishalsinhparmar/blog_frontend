import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CONFIG from '../config'
function BLoglistUser() {
    const {id} = useParams();
    const token = localStorage.getItem('token')
    const [userBlog,setUserbloglist] = useState([]);
    console.log(userBlog)
    console.log('the token is',token)
    const BlogID = async (id)=>{
        
     
      try{
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogByUserid/${id}`,{
          
        headers:{Authorization:`Bearer ${token}`},

          method:'GET'
        });

        if(res.ok){
          const data = await res.json();
          setUserbloglist(data.blog)
          console.log('the data of the blog',data)
          // alert(data.message)

        }
      }catch(err){
         console.log("the err",err.message)
      }
        
    }
    useEffect(()=>{
        BlogID(id)  
    },[id])
    
  return (
    <>
      {/* <hr className=''/> */}
    <div className='grid grid-cols-3 gap-3 bg-slate-300 p-4'>

    {userBlog.length>0 && 
     
     userBlog.map((item)=>(
      <>
       <div className="bg-slate-100 p-5 rounded-lg shadow-md " key={item._id}>
                            <img src={item.filepath} alt="Blog Image" className="w-full h-48 object-cover rounded-md" />
                            <h1 className="my-3">
                                <Link
                                    to={`/BlogDetail/${item._id}`}
                                    className="text-xl font-semibold text-teal-500 hover:underline"
                                >
                                    {}
                                </Link>
                            </h1>
                            <p className="text-sm text-gray-700">{item.description}...</p>
                            
                           
                        </div>
       </>
    ))}
    </div> 
    </>
  )
}

export default BLoglistUser