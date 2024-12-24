import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { myContext } from './Contextcomponets/CreateContext';
import CONFIG from '../config';

function DetailBlog() {
  const { user } = useContext(myContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState();
  const [blogbyId, setBlogById] = useState(null);
  const [comment, setcomment] = useState('');
  const [commentData, setcommentData] = useState({ commentData: [], commentCount: 0 });
  const token = localStorage.getItem('token');

  const getRelativeTime = (isoDate) => {
    return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
  };

  const BlogID = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogByid/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET',
      });

      if (res.ok) {
        const data = await res.json();
        setBlogById(data);
      }
    } catch (err) {
      console.log('Error fetching blog:', err.message);
    }
  };

  const commentPostsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogbyid/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });

      if (res.ok) {
        setcomment('');
        commentPostshhow();
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const commentPostshhow = async () => {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogbyid/${id}/comment`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setcommentData(data);
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    BlogID(id);
    commentPostshhow();
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      {blogbyId ? (
        <>
          <p className="flex items-center justify-end my-4 text-sm sm:text-base">
            <MdOutlineAccessTimeFilled className="mr-2 text-2xl" />
            <span className="font-semibold">{getRelativeTime(blogbyId?.createdAt)}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex justify-center p-4">
              <img
                src={blogbyId?.filepath}
                alt="Blog"
                className="w-full max-w-md h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-start p-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4">{blogbyId.title}</h2>
              <p className="text-sm sm:text-lg text-gray-800 mb-6">{blogbyId.description}</p>
              <div className="flex items-center mt-6">
                <h3 className="text-base sm:text-xl font-medium text-black">
                  <span className="text-blue-800">Author:</span>
                </h3>
                <div
                  className="ml-3 flex items-center"
                  onClick={() => navigate(`/userBloglist/${blogbyId.authorId._id}`)}
                >
                  <h4 className="text-green-500">{blogbyId?.authorId?.username}</h4>
                  <img
                    src={blogbyId?.authorId?.filepath}
                    alt="Author Avatar"
                    className="ml-3 h-16 w-16 rounded-full cursor-pointer hover:border-2 hover:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <p className="text-xl font-semibold text-red-500">No blog found</p>
        </div>
      )}

      <div className="mx-auto w-full mt-8">
        <h1 className="font-semibold text-xl text-center">Comments</h1>
        <p className="text-center mt-2">
          Comments: <span className="font-semibold">{commentData.commentCount}</span>
        </p>
        <hr className="mt-4 w-1/2 mx-auto" />

        <div className="my-4">
          <div className="flex items-center justify-center gap-4">
            <img
              src={user?.image}
              alt="comment"
              className="rounded-full bg-blue-100 w-14 h-14 cursor-pointer"
            />
            <form className="w-full" onSubmit={commentPostsubmit}>
              {error && <p className="text-red-500">{error}</p>}
              <input
                type="text"
                className="border-b-2 border-blue-500 outline-none text-sm px-2 py-2 w-1/2 rounded-md"
                placeholder="Comment here..."
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
              >
                Comment
              </button>
            </form>
          </div>

          <hr className="my-4" />
          <div className="flex flex-col my-4">
            {commentData.commentData.length > 0 ? (
              commentData.commentData.map((comment) => (
                <div key={comment._id} className="flex items-start my-2">
                  <img
                    src={comment.userid?.filepath}
                    alt="img"
                    className="rounded-full bg-blue-100 w-10 h-10 cursor-pointer"
                  />
                  <div className="px-4">
                    <h1 className="text-black font-semibold">{comment.userid?.username}</h1>
                    <p>{comment?.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;
