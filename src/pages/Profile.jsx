import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserPosts, deletePost as deletePostService } from '../utils/postService';

export default function Porfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getUserPosts();
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
    <div className="w-full min-h-screen">
      <div className="w-full h-full">
        <div className="w-11/12 m-auto flex p-3 h-full flex-col">
          {data.map((r) => (
            <div key={r._id} className="flex border-b border-gray-700 flex-col cursor-pointer pb-9" onClick={()=> handlePostClick(r._id)}>
              <div className="flex gap-3 p-3">
                <img
                  className="w-[60px] h-[60px] rounded-full object-cover"
                  src={r.userId?.image}
                  alt="image"
                />
                <p className="text-lg font-bold mt-2 capitalize text-white">
                  {r.userId?.name}
                  <span className="text-sm font-normal text-white/40"> · {new Date(r.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}</span>
                </p>
              </div>
              <div className="px-3">
                <p className="text-sm text-white">{r.content}</p>
                {r.images && r.images.length > 0 && (
                  <div className="mt-3 grid gap-2">
                    {r.images.map((image, index) => (
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
