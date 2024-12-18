import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {formatDistanceToNow, isDate} from 'date-fns'
import {MdOutlineAccessTimeFilled } from 'react-icons/md'
import { myContext } from './Contextcomponets/CreateContext';
import CONFIG from '../config'

function DetailBlog() {
    const {user} = useContext(myContext)
    const navigate = useNavigate();
    const { id } = useParams();
    const [error,setError]= useState()
    const [blogbyId, setBlogById] = useState(null);
    const [comment,setcomment] = useState('');
    const [commentData,setcommentData] = useState({ commentData: [], commentCount: 0 });
    console.log("the commentData is")
    const token = localStorage.getItem("token");
    console.log('the comment is a',commentData)
   
     const getRelativeTime = (isoDate)=>{
        return formatDistanceToNow(new Date(isoDate),{addSuffix:true})
     }

    const BlogID = async (id) => {
        if (!id) {
            return (
                <div className="flex justify-center items-center mt-10">
                    <p className="text-xl font-semibold text-red-500">Blog not found</p>
                </div>
            );
        }

        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogByid/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                console.log("blog data like author id ",data.authorId)
                setBlogById(data);
                
            }
        } catch (err) {
            console.log("Error fetching blog:", err.message);
        }
    };

    useEffect(() => {
        BlogID(id);
         commentPostshhow()
    }, [id]);

//  for the comment secotion
    const commentPostsubmit = async (e)=>{
        e.preventDefault();
    try{
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogbyid/${id}/comment`,{
           method:'POST',
           headers:{
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
                   },
           body: JSON.stringify({comment})
        });
         console.log('comment',res)
        if(res.ok){
            const data = await res.json();
            console.log('the data of the commets',data);
            setcomment('')
            commentPostshhow()

        } else{
             setError("somehing went wrong with the error")
        }
       } catch(err){
            console.log('the message of the err', err.message)
            setError("somehing went wrong with the error")

       }
    }
    const commentPostshhow = async ()=>{
       
    try{
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/blog/blogbyid/${id}/comment`,{
           method:'GET',
           headers:{Authorization: `Bearer ${token}`}
        });

        if(res.ok){
            const data = await res.json();
            setcommentData((prev ) => {
                const existingComments = new Set(prev.commentData.map((c) => c._id));
                console.log('existingComments',existingComments);
                const uniqueNewComments = data.commentData.filter((comment) => !existingComments.has(comment._id));
                console.log('uniquecomments',uniqueNewComments);

                return {
                    commentData: [...prev.commentData, ...uniqueNewComments],
                    commentCount: prev.commentData.length + uniqueNewComments.length,
                  };
        });
            // setcommentData(data.commentData)
            
            console.log('the data of the commets',data)
        } else{
             setError("somehing went wrong with the error")
        }
       } catch(err){
            console.log('the message of the err', err.message)
            setError("somehing went wrong with the error")

       }
    }
    // commentPostshhow()


    return (
        <>
            <div className="max-w-4xl mx-auto p-5">
                
                {blogbyId ? (
                    <>
                    <p className='flex items-center justify-end my-4'>
                        <MdOutlineAccessTimeFilled  className='mx-2 text-2xl'/>
                        <span className='font-semibold'>{getRelativeTime(blogbyId?.createdAt)}</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex justify-center p-4">
                            <img
                                src={blogbyId?.filepath}
                                alt="Blog"
                                className="w-full h-72 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex flex-col justify-start p-4">
                            <h2 className="text-3xl font-semibold text-blue-600 mb-4">{blogbyId.title}</h2>
                            <p className="text-lg text-gray-800 mb-6">{blogbyId.description}</p>

                            <div className="flex items-center mt-6">
                                <h3 className="text-xl font-medium text-black">
                                    <span className="text-blue-800">Author:</span>
                                </h3>
                                <div className="ml-3 flex items-center">
                                    <h4 className="text-green-500">{blogbyId?.authorId?.username}</h4>
                                    <div className="ml-3" onClick={()=>navigate(`/userBloglist/${blogbyId.authorId._id}`)}>
                                        <img
                                            src={blogbyId?.authorId?.filepath}
                                            alt="Author Avatar"
                                            className="h-16 w-16 rounded-full cursor-pointer hover:border-2 hover:border-blue-500"
                                        />
                                    </div>
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

                <div className='mx-auto w-full'>
                     <h1 className='font-semibold text-xl text-center'>Comments</h1>
                     <p>comments: <span className='font-semibold'> {commentData.commentCount}</span></p>
                     <hr className='mt-4 w-1/2 mx-auto' />

                     <div className='my-4'>
                        {/* user commets section */}
                          <div className='flex items-center justify-center gap-4'>
                              <img src={user?.image}  alt="comment" className='rounded-full bg-blue-100 w-14 h-14 cursor-pointer ' onClick={()=>navigate(`/userBloglist/${blogbyId.authorId._id}`)}/>
                               <form className='w-full' onSubmit={commentPostsubmit} >
                                {error && <p className='text-red-500'>{error}</p>}
                                     <input 
                                     type="text" 
                                     className=' border-b-2 border-l-2 rounded-l-md border-blue-500 outline-none text-sm px-2 focus:outline-none w-1/2 py-2'
                                     placeholder='comment here...'
                                     value={comment}
                                     onChange={(e)=> setcomment(e.target.value)}
                                     />
                                     <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md ml-2'>Comment</button>
                               </form>
                          </div>
                        {/* user commets section */}

                        {/* all comments */}
                        {/* <h2>Comments</h2>    */}
                        <hr className='my-4'/>
                        <div className='flex flex-col my-4 mt-5 '>
                            
                            {commentData.commentData.length >0 ? (
                               commentData.commentData.map((comment)=>(
                                 
                                <>
                               <div className='flex flex-row my-2'>
                                <img  src={comment.userid?.filepath} alt='img' className='rounded-full bg-blue-100 w-10 h-10 cursor-pointer ' onClick={()=>navigate(`/userBloglist/${comment.userid?._id}`)}/>
                                   <div className='px-4'>
                                      <h1 className='text-black font-semibold'>{comment.userid?.username}</h1>

                                      <p>{comment?.comment}</p>
                                   </div> 
                                   
                                   
                               </div>
                               <hr className=''/>
                               </>
                               ))
                             
                        ):(
                            <>
                               <p> nod comment are found</p>
                            </>
                        )}
                        </div>
                        
                        {/* all comments  */}
                     </div>
                </div>
            </div>
        </>
    );
}

export default DetailBlog;
