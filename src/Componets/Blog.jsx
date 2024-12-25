import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CONFIG from '../config'
function Blog() {
    console.log('the config file', CONFIG.API_BASE_URL)
    const token = localStorage.getItem("token");
    const [blog, setBlog] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setcurrentPage] = useState(1);
    const [totalpage, settotalpage] = useState();
    const [blogcount, setTotalblog] = useState();
    const [loading, setloading] = useState(false);


    console.log('the page', currentPage)
    console.log("blog count", blog)
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const fetchBlog = async (page) => {
        setloading(true)
        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/showblog?page=${page}&limit=${3} `, {
                headers: { Authorization: `Bearer ${token}` },
                method: 'GET'
            });

            const data = await res.json();
            console.log(data)
            if (data) {
                setBlog(data.blogpost);
                setcurrentPage(data.page)
                settotalpage(data.pages);
                setTotalblog(data.blogCount)
            }


        } catch (err) {
            console.log(err);
        } finally {
            setloading(false)
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);
    const handlePagechnage = (page) => {
        fetchBlog(page)
    }

    if (!token) {
        return (
            <div className="flex justify-center items-center mx-auto  w-full py-5  rounded-lg bg-zinc-50">
                <h3 className="font-semibold lg:inline-flex">
                    The user is not logged in. Please log in first.
                    <button
                        onClick={() => navigate('/SignIn')}
                        className="mx-3 bg-lime-300 hover:bg-lime-400 px-2 rounded-md text-center"
                    >
                        SignIn
                    </button>
                </h3>
            </div>
        );
    }

    const renderPagination = () => {
        const pages = Array.from({ length: totalpage }, (_, i) => i + 1);
        return pages.map((num) => (
            <>
                <button className={` px-3  rounded-md mx-3 py-1 ${num === currentPage ? 'bg-blue-400 text-white' : 'bg-black text-white hover:bg-blue-400'}`} onClick={() => handlePagechnage(num)} value={num} >{num}</button>
            </>
        ))
    }

    return (
        <>
            <div className="flex justify-between items-center mx-3 my-5">
                <p className="text-3xl">
                    <span className="font-bold text-5xl text-blue-600">B</span>logs:
                </p>


                <button
                    className="bg-blue-400 rounded-lg px-4 py-2 text-white border-none hover:text-black hover:bg-transparent  outline-none"
                    onClick={() => navigate('/createBlog')}
                >
                    Create Blog
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className=" ease-linear animate-spin rounded-full border-4 border-t-4 border-blue-400 h-12 w-12"></div>
                </div>
            ) : (
                <>




                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">

                        {blog.length > 0 &&
                            blog.map((li) => (

                                <div className="bg-slate-100 p-5 rounded-lg shadow-md" key={li._id}>
                                    <p className='text-black font-medium text-right my-2'>{formatDate(li.authorId?.createdAt)}</p>

                                    <img src={li.filepath} alt="Blog Image" className="w-full h-48 object-cover rounded-md" />
                                    <h1 className="my-3">
                                        <Link
                                            to={`/BlogDetail/${li._id}`}
                                            className="text-xl font-semibold text-teal-500 hover:underline"
                                        >
                                            {li.title}
                                        </Link>
                                    </h1>
                                    <p className="text-sm text-gray-700">{li.description.slice(0, 150)}...</p>
                                    <Link
                                        to={`/BlogDetail/${li._id}`}
                                        className="text-teal-500 hover:underline mt-2 block"
                                    >
                                        Read More
                                    </Link>

                                    <div className="flex justify-between items-center mt-5">
                                        <h1 className="text-black font-medium">
                                            <span className="text-blue-800">Author:</span>
                                        </h1>
                                        <div className="flex items-center">
                                            <h2 className="text-green-500">{li.authorId?.username}</h2>
                                            <div className="ml-3">
                                                <img
                                                    src={li.authorId?.filepath}
                                                    alt="Author Avatar"
                                                    className="h-16 w-16 rounded-full cursor-pointer hover:border-2 hover:border-blue-500"
                                                    onClick={() => navigate(`/userBloglist/${li.authorId?._id}`)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className='flex justify-center my-4'>

                        {renderPagination()}
                    </div>
                    <p className='block text-right mx-2 mb-2 text-blue-300'>Total blog: <span className='text-black bg-slate-200 rounded-full px-2'>  {blogcount}</span></p>
                </>
            )};

        </>
    )
}
export default Blog;
