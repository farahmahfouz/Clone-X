import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import { getAllPosts, deletePost as deletePostService } from "../utils/postService";
import PostComponent from "../components/PostComponent";
import EditPost from "../components/EditPost";
import { useHandleLike } from "../hooks/useHandleLike";
import CommentActions from "../components/CommentsActions";


export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLike = useHandleLike(setData);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await getAllPosts();
      setData(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  useEffect(() => {
    const handlePostAdded = () => {
      fetchPosts();
    };

    window.addEventListener('postAdded', handlePostAdded);
    return () => {
      window.removeEventListener('postAdded', handlePostAdded);
    };
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await deletePostService(id);
      setData(prevData => prevData.filter(post => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleEditPost = (postId) => {
    setEditingPostId(postId);
  };

  useEffect(() => {
    if (editingPostId) {
      const modal = document.getElementById("edit_post_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [editingPostId]);


  const handleEditSuccess = () => {
    fetchPosts();
  };
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  if (loading)
    return (
      <div className="bg-black h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <PostComponent onSuccess={fetchPosts} />
      {editingPostId && (
        <EditPost
          postId={editingPostId}
          onClose={() => {
            setEditingPostId(null);
            document.getElementById('edit_post_modal').close();
          }}
          onSuccess={handleEditSuccess}
        />
      )}
      <div className="w-full m-auto flex h-full flex-col" >
        {data.map((post) => (
          <div key={post._id} className="border-b border-gray py-4 cursor-pointer" onClick={() => handlePostClick(post._id)}>
            <div className="flex items-start gap-2 sm:gap-3 px-3 sm:px-5">
              <img
                src={post.userId?.image || 'default.jpg'}
                alt={post.userId?.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex justify-between">

                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <span className="font-bold text-sm text-white capitalize">{post.userId?.name}</span>
                    <span className="text-xs text-white/40">@{post?.userId?.email?.split('@')[0] || "User"}</span>
                    <span className="text-xs font-normal text-white/40"> · {formatTimeAgo(post.createdAt)}</span>
                  </div>
                  {isAuthenticated && post.userId?._id === user?._id && (
                    <div className="relative group">
                      <button className="p-2 rounded-full text-white hover:text-white/30 hover:bg-gray/30 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      <div className="absolute right-0 top-full mt-1 bg-black border border-gray-700 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[120px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPost(post._id)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post._id)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}

                </div>
                <p className="text-white font-thin mt-2 text-sm sm:text-base break-words">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="mt-3 grid gap-2">
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-auto rounded-lg object-cover max-h-[300px] sm:max-h-[400px]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between w-full sm:gap-4 mt-3">
                  <div className="flex items-center justify-between w-full sm:gap-2">
                   <CommentActions post={post} handleLike={handleLike} posts={data}/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

