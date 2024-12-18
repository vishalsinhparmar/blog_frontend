import React, { useEffect, useState } from 'react'
//  import  {Font} from '@fortawesome/fontawesome-svg-core'
import {TfiEmail} from 'react-icons/tfi'
import {FcApproval} from 'react-icons/fc'
import { Link, useParams } from 'react-router-dom';
import CONFIG from '../../config'

function VerifyuserBymail() {
  const [data,setdata] = useState();
  const {token} = useParams();
  console.log('the data for the verifyEmail',data)
  // if(!token) return;
  const fetchMessage = async () => {
    console.log('verifyToken',token)
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/verifyemail/${token}`, {
            headers: {'Content-Type':'json/application' },
            method: 'GET'
        });

        const data = await res.json();
        setdata(data);
    } catch (err) {
        console.log(err);
    }
};

if(token){
useEffect(() => {
  fetchMessage();
}, []);
}
  return (
    <>
    {/* <p>verify email</p> */}
    {
     token &&  data ? (
       
        <div className='max-w-full mx-auto items-center flex justify-center my-4 '>
        <div className='flex  flex-col justify-center items-center h-56 border shadow-lg border-dotted px-4 w-1/2 max-w-1/2 rounded-lg bg-blue-50 '>
            <p className='text-black font-semibold text-xl'>{data?.message}</p>
             <span><FcApproval className=' text-6xl'/></span>
            <TfiEmail className='text-4xl text-blue-700 mt-4'/>
         {/* <p>{data?.message}</p> */}
             <span className='text-sm font-semibold  underline underline-offset-4 mt-4'><Link to="/SignIn">You can SignIn now</Link></span>
         </div>
         </div>
        
      ):(

        <>
                   <div className='max-w-full mx-auto items-center flex justify-center my-4 '>
           <div className='flex  flex-col justify-center items-center h-56 border shadow-lg border-dotted px-4 w-1/2 max-w-1/2 rounded-lg bg-blue-100 '>
            <p className='text-black font-semibold text-xl'>You can verify to check your Mail and click on the link</p>
            <TfiEmail className='text-4xl text-blue-700 mt-4'/>
         <p>{data?.message}</p>
         </div>
         </div> 
        </>
      )
  }
  </>
  )
}

export default VerifyuserBymail