import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import LikeIcon from "../icons/LikeIcon";
import { getAllPosts, deletePost as deletePostService } from "../utils/postService";
import PostComponent from "../components/PostComponent";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setData(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handleDeletePost = async (id) => {
    try {
      await deletePostService(id);
      setData((prevData) => prevData.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
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

      <div className="w-full m-auto flex h-full flex-col">
        {data.map((post) => {
          return (
            <div
              key={post._id}
              className="flex border-b border-gray-700 flex-col pb-9 cursor-pointer transition-colors"
              onClick={() => handlePostClick(post._id)}
            >
              <div className="flex py-3 gap-3 items-center">
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  src={post.userId?.image || 'default.jpg'}
                  alt={post.user?.name || "User Image"}
                />
                <p className="text-md font-semibold text-white capitalize">
                  {post.userId?.name || "Unknown User"}
                </p>
                <span className="text-sm font-normal text-white/40">· {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}</span>
              </div>

              <div className="px-3">
                <p className="text-sm text-white break-words">{post.content}</p>
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

              <div className="flex justify-between gap-3 pt-4 px-3 items-center" onClick={(e) => e.stopPropagation()}>
                <div className="text-gray-400 text-sm flex items-center gap-1">
                  <LikeIcon className="text-red-500" />
                  {post.totalLikes || 0} Likes
                </div>

                {isAuthenticated && user && post.userId?._id === user._id && (
                  <div className="flex gap-3">
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="btn btn-sm rounded-full bg-sky-500 hover:bg-sky-600 text-white border-none w-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post._id);
                      }}
                      className="btn btn-sm rounded-full border-white text-sky-500 bg-transparent hover:bg-sky-950 w-20"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

