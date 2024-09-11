import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../auth/Auth";
import Trending from "../components/Trending";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userNames, setUserNames] = useState({});
  // const token = localStorage.getItem("token");
  const { token } = useContext(AuthContext);

  useContext(token);
  useEffect(() => {
    axios
      .get("https://clone-x-by-farah.glitch.me/posts/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { posts } = res.data.data;
        setData(posts);
        // console.log(posts)
        setLoading(false);
        res.data.data.posts.forEach((post) => {
          axios
            .get(`https://clone-x-by-farah.glitch.me/users/${post.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((userRes) => {
              // console.log(userRes.data.data);
              setUserNames((prev) => ({
                ...prev,
                [post.userId]: userRes.data.data.user.name,
              }));
            })
            .catch((error) => {
              console.error("Error fetching user info:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error);
        setLoading(false);
      });
  }, [token]);

  const deletePost = (id) => {
    axios
      .delete(`https://clone-x-by-farah.glitch.me/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setData((prevData) => prevData.filter((post) => post._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting post:", error.response.data);
      });
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
    <div className=" w-full">
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full h-full bg-black">
        <div className="">
          <Sidebar />
        </div>
        <div className=" h-full  border border-gray-800 border-t-0">
          <div className="w-11/12 m-auto flex p-3 h-full flex-col">
            {data.map((r, index) => (
              <div
                key={index}
                className="flex border-b border-gray-700 flex-col pb-9"
              >
                <div className="flex p-3">
                  <img
                    className="w-[60px] h-[60px] rounded-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="image"
                  />
                  <p className="text-lg font-bold text-white p-3">
                    {userNames[r.userId] || "Unknown User"}
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
                    className="btn btn-sm rounded-full border-white text-sky-500 bg-transparent hover:bg-sky-950  w-15 md:w-20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=""><Trending/></div>
      </div>
    </div>
  );
}

////I Promise you I will fix this shit soon..../////
