import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../Contextcomponets/CreateContext';
import PasswordComponets from '../PasswordComponets';

function SignIn() {
  const navigate = useNavigate();
  const [Form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // Error state for displaying form errors
  const [loading,setloading] = useState(false);
  
  const { setuserToken } = useContext(myContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...Form, [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setloading(true)
    const { email, password } = Form;

    try {
      const res = await fetch('http://localhost:5000/api/auth/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.token) {
          localStorage.setItem('token', result.token);
          setuserToken(result.token);
          setForm({ email: '', password: '' });
          setError(null); 
          navigate('/');
        } else {
          setError('Invalid credentials. Please try again.'); // Set error message if no token
        }
      } else {
        setError('Error during sign-in. Please try again later.'); // Generic error message
      }

    } catch (err) {
      console.log(err);
      setError('Something went wrong. Please try again.');
    } finally {
       setloading(false)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <p className="text-center text-3xl font-semibold text-blue-700 mb-4">Sign In</p>
        <hr className="w-1/4 mx-auto mb-5 border-gray-300" />

        {/* Form */}
        <form onSubmit={submitForm} className="flex flex-col space-y-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={Form.email}
              onChange={handleChange}
              className="bg-white rounded-md border border-gray-300 p-3 w-full text-xl placeholder-gray-500"
            />
          </div>  

          <div className=''>
         <PasswordComponets
              onChangefn = {handleChange} 
              valName = {Form.password} 
              name = "password" 
              label="passsword"
              placeholderName = "passsword"
         />
          </div>

          <button
            
            type="submit"
            disabled = {loading}
            className={` text-white text-2xl font-medium rounded-md p-3 mt-5 ${loading ? `bg-slate-600 blur-none cursor-progress`:"hover:bg-green-600 bg-green-500"} transition duration-200`}
          >
           {loading ? "processing...":"Sign In"} 
          </button>
        </form>

        {/* Sign Up and Forgot Password Links */}
        <div className="mt-4 text-right">
          <p className="text-sm font-light">Don't have an account? <Link to="/SignUp" className="text-blue-600 font-medium hover:underline">Sign Up</Link></p>
          <button
            className="text-red-500 text-sm font-medium mt-3 hover:underline"
            onClick={() => navigate('/ForgottePassword')}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
