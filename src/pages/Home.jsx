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
        await unlikePost(postId);
        setData(prevData => prevData.map(p =>
          p._id === postId
            ? { ...p, isLiked: false, likesCount: p.likesCount - 1 }
            : p
        ));
      } else {
        await likePost(postId);
        setData(prevData => prevData.map(p =>
          p._id === postId
            ? { ...p, isLiked: true, likesCount: p.likesCount + 1 }
            : p
        ));
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
      <PostComponent />
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
          <div key={post._id} className="border-b border-gray-800 p-4 cursor-pointer" onClick={() => handlePostClick(post._id)}>
            <div className="flex items-start gap-3">
              <img
                src={post.userId?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{post.userId?.name}</span>
                  <span className="text-gray-500">{post.userId?.email}</span>
                  <span className="text-sm font-normal text-white/40">· {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
                <p className="text-white mt-2">{post.content}</p>
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
                <div className="flex justify-between gap-4 mt-3">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleLike(e, post._id)}
                      className={`text-gray-500 hover:text-pink-700 ${post.isLiked ? 'text-pink-600' : ''}`}
                    >
                      {post.isLiked ? <FilledLikeIcon /> : <LikeIcon />}
                    </button>
                    <p className="text-sm text-white/50">{post.likesCount}</p>
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

