import {  useEffect, useState } from 'react';
import {MdDeleteForever} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import CONFIG from '../config'

function User() {
    const navigate = useNavigate();
    // const { userblog, setUserblog } = useContext(myContext);
    const [userBlogdata,setUserblogdata] = useState([])
    const token = localStorage.getItem('token');
    const [loading,setloading] = useState(false);
 

    const deleteBlog = async (id) => {
        setloading(true)
        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/Userblogdelete/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                console.log('Blog deleted successfully', data);
                setUserblogdata((prev)=> prev.filter(blog => blog._id !== id))
            } else {
                const data = await res.json();
                console.log('Error deleting blog', data.message);
            }
        } catch (err) {
            console.log(err.message);
        } finally{
            setloading(false)
        }
    };

    useEffect(() => {
        const userBlog = async () => {
            setloading(true)
            try {
                const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/Userblog`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUserblogdata(data.blog);
                } else {
                    const data = await res.json();
                    console.log('Error fetching user blog', data.message);
                }
            } catch (err) {
                console.log(err.message);
            }finally{
                setloading(false)
            }
        };
        userBlog();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-blue-600">User Blogs</h1>
                <hr className="w-1/4 border-b-2 mx-auto mt-3 border-blue-300" />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                <div className=" ease-linear animate-spin rounded-full border-4 border-t-4 border-blue-400 h-12 w-12"></div>
            </div>
            ):(
                <>
                
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {userBlogdata.length > 0 ? (
                    userBlogdata.map((blog) => (
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" key={blog._id}>
                            <h3 className="text-blue-700 text-center text-xl font-semibold mb-3">
                                <span className="uppercase text-black font-bold">{blog.title.at(0)}</span>{blog.title.slice(1)}
                            </h3>
                            <img src={blog.filepath} alt="Blog Image" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <p className="text-gray-700 text-base mb-4">{blog.description.slice(0, 100)}...</p>
                            <div className="flex justify-between gap-4">
                                <button
                                    className="bg-red-500 px-4 py-2 text-sm  text-white rounded-md border hover:border-black hover:bg-red-50 hover:text-red-600 transition duration-200 flex items-center justify-center"
                                    onClick={() => deleteBlog(blog._id)}
                                >
                                  <span><MdDeleteForever className='text-xl'/></span>  Delete
                                </button>
                                <button
                                    className="bg-blue-500 px-4 py-2 text-white rounded-md border hover:bg-blue-400 transition duration-200"
                                    onClick={() => navigate(`/createBlog/${blog._id}`)}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-xl text-gray-500 mt-5">
                        <p>You have no blogs yet.</p>
                        <button onClick={()=> navigate(`/createBlog`)} className='text-blue-400 border border-black  px-2 py-1 mt-5'>createBlog</button>
                    </div>
                )}
            </div>
            </>
            )}
        </div>
        
    );
}


export default User;
