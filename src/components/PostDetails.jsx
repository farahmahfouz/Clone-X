import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../utils/postService';
import LikeIcon from '../icons/LikeIcon';
import ArrowLeft from '../icons/ArrowLeft';

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
            src= {post.userId.image || '/default.jpg'}
            alt={post.userId.name}
          />
          <div>
            <p className="text-md font-semibold capitalize">{post.userId.name}</p>
            <span className="text-sm text-white/40">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
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
        </div>

        {/* Post Stats */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <LikeIcon className="text-red-500" />
              <span>{post.likesCount || 0} Likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 