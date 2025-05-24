import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../utils/postService';
import ArrowLeft from '../icons/ArrowLeft';
import CommentsPost from './CommentsPost';
import CommentActions from './CommentsActions';

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData.post);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [id]);

  if (loading)
    return (
      <div className="bg-black h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="relative text-white min-h-screen">
      <div>
        <button
          onClick={() => window.history.back()}
          className="bg-black text-white top-3 start-3 absolute rounded-3xl"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="max-w-2xl mx-auto p-4 mt-12">
        <div className="flex items-center gap-3 mb-4">
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={post?.userId?.image || '/default.jpg'}
            alt={post?.userId?.name}
            loading='lazy'
          />
          <div>
            <p className="text-md font-semibold capitalize">{post.userId.name}</p>
            <div className='flex gap-2'>
              <p className="text-xs font-thin text-white/40">@{post.userId.email.split('@')[0]}</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-lg text-white break-words">{post.content}</p>
          {post.images && post.images.length > 0 && (
            <div className="mt-3 grid gap-2">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-auto rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          <span className="text-xs font-thin text-white/40">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Post Stats */}
          <div className="text-gray">
            <div className="flex justify-between gap-2 sm:gap-4">
              <CommentActions post={post}/>
            </div>
        {/* Comment Section */}
        <CommentsPost postId={id} initialComments={post.comments} />
      </div>
    </div>
    </div >
  );
} 