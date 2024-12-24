import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CONFIG from '../config';

function BLoglistUser() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [userBlog, setUserbloglist] = useState([]);
    const [loading, setLoading] = useState(true);

    const BlogID = async (id) => {
        try {
            setLoading(true);
            const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogByUserid/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                setUserbloglist(data.blog);
            }
        } catch (err) {
            console.error("Error fetching user blogs:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        BlogID(id);
    }, [id]);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center my-5 text-blue-600">
                    User's Blogs
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center my-10">
                        <div className="ease-linear rounded-full border-4 border-t-4 border-blue-400 h-12 w-12"></div>
                    </div>
                ) : userBlog.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {userBlog.map((item) => (
                            <div
                                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                key={item._id}
                            >
                                <img
                                    src={item.filepath}
                                    alt="Blog"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-teal-500">
                                        <Link to={`/BlogDetail/${item._id}`} className="hover:underline">
                                            {item.title || "Untitled Blog"}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {item.description.slice(0, 150)}...
                                    </p>
                                    <Link
                                        to={`/BlogDetail/${item._id}`}
                                        className="text-blue-500 hover:underline mt-3 block"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <p>No blogs found for this user.</p>
                    </div>
                )}
            </div>


        </>
    );
}

export default BLoglistUser;
