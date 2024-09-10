import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

export default function Porfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [userNames, setUserNames] = useState({});

  // useEffect(() => {
  //   axios
  //     .get("https://clone-x-by-farah.glitch.me/posts/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       // console.log("Response data:", res.data.data.posts);
  //       setData(res.data.data.posts);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, [token]);


  useEffect(() => {
    axios
      .get("https://clone-x-by-farah.glitch.me/posts/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data.posts);
        setLoading(false);
        res.data.data.posts.forEach((post) => {
          axios
            .get(`https://clone-x-by-farah.glitch.me/users/${post.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })  
            .then((userRes) => {
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setData((prevData) => prevData.filter((post) => post._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting post:", error.response.data);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className=" w-full ">
      <div className=" w-full h-full bg-black">
        {/* <div className=""></div> */}
        <div className=" h-full  border border-gray-800 border-t-0">
          <div className="w-11/12 m-auto flex p-3 h-full flex-col">
            {data.map((r, index) => (
              <div key={index} className="flex border-b border-gray-700 flex-col pb-9">
                <div className="flex p-3">
                  <img
                    className="w-[60px] h-[60px] rounded-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="image"
                  />
                <p className="text-lg font-bold text-white p-3"> {userNames[r.userId] || "Unknown User"}</p>
                </div>
                <div className="px-3">
                  <p className="text-sm text-white">{r.content}</p>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Link to={`/edit-post/${r._id}`} className="btn btn-sm rounded-full bg-sky-500 hover:bg-sky-600 text-white border-none w-15 md:w-20">
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
        {/* <div className=""></div> */}
      </div>
    </div>
  );
}

////I Promise you I will fix this shit soon..../////
