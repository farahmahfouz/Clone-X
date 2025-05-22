import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import LikeIcon from "../icons/LikeIcon";
import FilledLikeIcon from "../icons/FilledLikeIcon";
import { getAllPosts, deletePost as deletePostService, likePost, unlikePost } from "../utils/postService";
import PostComponent from "../components/PostComponent";
import EditPost from "../components/EditPost";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    if (!isAuthenticated) return;

    try {
      const post = data.find(p => p._id === postId);
      if (post.isLiked) {
        setData(prevData => prevData.map(p =>
          p._id === postId
            ? { ...p, isLiked: false, likesCount: p.likesCount - 1 }
            : p
        ));
        await unlikePost(postId);
      } else {
        setData(prevData => prevData.map(p =>
          p._id === postId
            ? { ...p, isLiked: true, likesCount: p.likesCount + 1 }
            : p
        ));
        await likePost(postId);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
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
            <div className="flex items-start gap-3 px-5">
              <img
                src={post.userId?.image || 'default.jpg'}
                alt={post.userId?.name}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white capitalize">{post.userId?.name}</span>
                  <span className="text-xs text-white/40">@{post?.userId?.email?.split('@')[0] || "User"}</span>
                  <span className="text-xs font-normal text-white/40"> · {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
                <p className="text-white font-thin mt-2">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="mt-3 grid gap-2">
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-auto rounded-lg object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                <div className="flex justify-between gap-4 mt-3">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 p-2 rounded-full hover:bg-blue-900/20 hover:text-blue-400 transition-colors group">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">0</span>
                    </button>

                    <button className="flex items-center gap-2 p-2 rounded-full hover:bg-green-900/20 hover:text-green-400 transition-colors group">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm">0</span>
                    </button>

                    <button className={`flex items-center gap-2 p-2 rounded-full hover:bg-pink-900/20 hover:text-pink-600 ${post.isLiked ? 'text-pink-500' : ''} transition-colors group`} onClick={(e) => handleLike(e, post._id)}>
                      {post.isLiked ? <FilledLikeIcon /> : <LikeIcon />}  
                      <span className="text-sm">{post.likesCount}</span>
                    </button>
                  </div>
                  {isAuthenticated && post.userId?._id === user?._id && (
                    <div className="flex gap-2">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleEditPost(post._id)
                      }} className="btn btn-sm rounded-full bg-primary hover:bg-sky-600 text-white border-none w-20">
                        Edit
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post._id)
                      }} className="btn btn-sm rounded-full border-white text-primary bg-transparent hover:bg-sky-950 w-20">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

