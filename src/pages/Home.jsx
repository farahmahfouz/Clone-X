import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";
import { AuthContext } from "../auth/Auth";
import LikeIcon from "../icons/LikeIcon";
import { getAllPosts, deletePost as deletePostService } from "../utils/postService";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user, isAuthenticated } = useContext(AuthContext);

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

  if (loading)
    return (
      <div className="bg-black h-screen">
        <div className="flex justify-center text-sky-600">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full bg-black">
        <div className="">
          <Sidebar />
        </div>
        <div className="h-full border border-gray-800 border-t-0">
          <div className="w-11/12 m-auto flex p-3 h-full flex-col">
            {data.map((post) => {
                        return (
                <div
                  key={post._id}
                  className="flex border-b border-gray-700 flex-col pb-9"
                >
                  <div className="flex p-3 gap-3 items-center">
                    <img
                      className="w-[50px] h-[50px] rounded-full object-cover"
                      src={post.userId?.image || 'default.jpg'}
                      alt={post.user?.name || "User Image"}
                    />
                    <p className="text-md font-semibold text-white">
                      {post.userId?.name || "Unknown User"}
                    </p>
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

                  <div className="flex justify-between gap-3 pt-4 px-3 items-center">
                    <div className="text-gray-400 text-sm flex items-center gap-1">
                      <LikeIcon className="text-red-500" />
                      {post.totalLikes || 0} Likes
                    </div>

                    {isAuthenticated && user && post.userId?._id === user._id && (
                      <div className="flex gap-3">
                        <Link
                          to={`/edit-post/${post._id}`}
                          className="btn btn-sm rounded-full bg-sky-500 hover:bg-sky-600 text-white border-none w-20"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post._id)}
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
        </div>
        <div className=""><Trending /></div>
      </div>
    </div>
  );
}

////I Promise you I will fix this shit soon..../////
