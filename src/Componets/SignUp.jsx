import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [Form, setForm] = useState({ username: '', email: '', password: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...Form, [name]: value
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { username, email, password } = Form;

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('username', username);
      if (image) {
        formData.append('image', image);
      }

      const res = await fetch('http://localhost:5000/api/auth/SignUp', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const result = await res.json();
        alert(result.message);
        setForm({ email: '', password: '', username: '' });
        setImage(null);
      } else {
        alert("Error: " + res.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen py-10">

      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">

        <p className="text-center mx-auto text-blue-700 text-3xl p-4">Sign Up</p>

        <hr className="w-28 text-black mx-auto" />
        <form onSubmit={submitForm} className="flex flex-col gap-y-4">

          <div className="w-full my-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={Form.username}
              onChange={handleChange}
              className="bg-white border w-full rounded-md p-3 border-gray-300 placeholder:text-gray-500"
            />
          </div>

          <div className="w-full my-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={Form.email}
              onChange={handleChange}
              className="bg-white rounded-md border border-gray-300 placeholder:text-gray-500 placeholder:text-xl px-2 pl-5 w-full p-3 text-xl"
            />
          </div>

          <div className="w-full my-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={Form.password}
              onChange={handleChange}
              className="bg-white rounded-md border border-gray-300 placeholder:text-gray-500 placeholder:text-xl px-2 pl-5 w-full p-3 text-xl"
            />
          </div>

          <div className="w-full my-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white rounded-md border border-gray-300 placeholder:text-gray-500 placeholder:text-xl px-2 pl-5 w-full p-3 text-xl"
            />
          </div>

          <button type="submit" className="text-white font-medium text-2xl w-1/2 mx-auto mt-3 bg-green-500 rounded-md border hover:bg-green-400 p-3">Submit</button>

          <p className="font-thin text-right mt-5">Already have an account? <span className="text-blue-600"><Link to="/SignIn">Sign In</Link></span></p>

        </form>
      </div>
    </div>
  );
}

export default SignUp;
