import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPosts, deletePost as deletePostService } from '../utils/postService';
// import { AuthContext } from "../auth/Auth";

export default function Porfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { token } = useContext(AuthContext);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getUserPosts();
        console.log(posts);
        setData(posts)
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()

  }, []);

  const deletePost = async (id) => {
    try {
      await deletePostService(id);
      setData((prevData) => prevData.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return (
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
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-full">
        <div className="w-11/12 m-auto flex p-3 h-full flex-col">
          {data.map((r, index) => (
            <div key={index} className="flex border-b border-gray-700 flex-col pb-9">
              <div className="flex gap-3 p-3">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={r.userId?.image || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                  alt="image"
                />
                <p className="text-lg font-bold mt-2 capitalize text-white">
                  {r.userId?.name}
                  <span className="text-sm font-normal text-white/40">· {new Date(r.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}</span>
                </p>
              </div>
              <div className="px-3">
                <p className="text-sm text-white">{r.content}</p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Link
                  to={`/edit-post/${r._id}`}
                  className="btn btn-sm rounded-full bg-sky-500 hover:bg-sky-600 text-white border-none w-15 md:w-20"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(r._id)}
                  className="btn btn-sm rounded-full border-white text-sky-500 bg-transparent hover:bg-sky-950 w-15 md:w-20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

////I Promise you I will fix this shit soon..../////
