import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PasswordComponets from '../PasswordComponets';
import {MdMarkEmailRead} from 'react-icons/md'
import CONFIG from '../../config'


function NewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false);

  console.log('userPassword', userPassword);

  const handleChange = (e) => {
    const { value } = e.target;
    setUserPassword(value);
  };

  const formPassword = async (e) => {
    e.preventDefault();
    console.log('userPassword', userPassword);
    setLoading(true)
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/resetpassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newpassword: userPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('the data is', data);
        alert(`The message is: ${data.message}`);
        navigate('/SignIn')
         
      } else {
        const data = await res.json();
        console.log('the error', data.err);
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.log('The error occurred in resetting password', err.message);
      setError('Something went wrong. Please try again.')

    } finally {
       setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {token ? (
             <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
             <p className="text-center text-blue-700 text-3xl font-semibold mb-6">Set New Password</p>
             <hr className="w-28 mx-auto my-4 border-t-2 border-blue-500" />
             <form onSubmit={formPassword} className="flex flex-col space-y-4">
               {error && <p className='text-red-400 text-center mb-10'>{error}</p>}
     
               <div>
                 {/* <input
                   type="password"
                   name="password"
                   placeholder="Enter your new password"
                   required
                   // value={userPassword}
                   onChange={handleChange}
                   className="w-full p-3 text-xl text-blue-600 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 /> */}
                     <PasswordComponets
                   onChangefn = {handleChange} 
                   valName = {userPassword} 
                   name = "password" 
                   label="passsword"
                   placeholderName = "passsword"
                 />
               </div>
     
               <button
                 disabled = {loading}
                 type="submit"
                 className={` text-white text-2xl font-medium rounded-md p-3 mt-5 ${loading ? `bg-slate-600 blur-none cursor-progress`:"hover:bg-green-600 bg-green-500"} transition duration-200`}
               >
                {loading ? "processing...":"submit"}
               </button>
             </form>
           </div>
      ):(
          <div className='flex flex-col items-center justify-center bg-slate-100 p-10 rounded-lg shadow-md'>
             <p className='font-bold text-xl'>You have sent link on email for the reset password</p>
             <span><MdMarkEmailRead className='text-5xl text-gray-700'/></span>
          </div>
      )
      
      }
    
    </div>
  );
}

export default NewPassword;
