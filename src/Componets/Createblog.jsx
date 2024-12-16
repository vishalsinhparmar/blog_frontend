import { useContext, useEffect, useState } from 'react'
import { myContext } from './Contextcomponets/CreateContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FcAddImage} from 'react-icons/fc'

function CreateBlog() {
  const token = localStorage.getItem('token');
  const {id} = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
 
  console.log('the img for the id');

  useEffect(() => {
    if (id) {
      const updateFetch = async () => {
        const res = await fetch(`http://localhost:5000/api/blog/blogUpdatebyid/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          console.log("the data of createBlog update obj", data);
          setBlog({ title: data.title, description: data.description });
          setImage(data.filepath);
          setLoading(false);
        }
      }
      updateFetch();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const blogSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('description', blog.description);
      if (image) {
        formData.append('image', image);
      }

      const url = id ? `http://localhost:5000/api/blog/UserblogUpdte/${id}` : `http://localhost:5000/api/blog/createBlog`;
      console.log('the url is a', url);

      const method = id ? 'PATCH' : 'POST';
      console.log('the method of the', method);

      const res = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log('the data is', data);
        setBlog({ title: "", description: "" });
        setImage(null);

        alert(`${id ? "update" : "create"}`);
        navigate('/user');
      } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false)
    }
  };

  // if (loading) return <>Loading ...</>;

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center ">
        <form onSubmit={blogSubmit} className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg my-10">
          <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">{id ? "Update Blog" : "Create Blog"}</h2>

          {/* Image Upload */}
          <div className=" mb-4 flex flex-col items-center  justify-center">
            <label htmlFor="image"        
             className="flex items-center justify-center flex-col border border-dashed  border-gray-200 w-full rounded-lg h-64 cursor-pointer bg-gray-50">
                <span className='font-medium'> Upload Image</span>
            
               <div className=''>
               <FcAddImage className='text-6xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125  duration-300'/>
               </div>
               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 50x100px)</p>           
              </label>
            <input type="file" id="image" accept="image/*"  onChange={handleChangeImage} 
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 hidden" />
{image && (
  typeof image === "string" ? (
    <img src={image} alt="preview" className="mt-4 w-32 h-32 object-cover rounded-lg" />
  ) : (
    <img src={URL.createObjectURL(image)} alt="preview" className="mt-4 w-32 h-32 object-cover rounded-lg" />
  )
)}          </div>

          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg text-gray-600 mb-2">Blog Title</label>
            <input type="text" id="title" name="title" placeholder="Enter Blog Title" required 
              value={blog.title} onChange={handleChange} 
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg text-gray-600 mb-2 ">Blog Description</label>
            <textarea id="description" name="description" placeholder="Write your blog description here..." 
              required value={blog.description} onChange={handleChange} 
              className="bg-gray-50 h-24 border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" 
            disabled = {loading}
            className={`{${loading ? 'bg-slate-500 cursor-progress':'bg-blue-600'} text-white bg-blue-600 font-medium text-lg px-6 py-3 rounded-md hover:bg-blue-500 transition duration-300 `}>
              {id ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
