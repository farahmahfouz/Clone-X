import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WorldIcon from "../icons/WorldIcon";

export default function AddPost() {
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const addPost = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://clone-x-by-farah.glitch.me/posts/me",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Post added:", res.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <form
        onSubmit={addPost}
        className=" md:w-1/2 p-5 rounded-3xl border border-gray-800 bg-black h-80"
      >
        <div className="flex">
          <img
            className="w-[60px] h-[60px] rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="image"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's Happening?!"
            className="textarea textarea-bordered text-lg text-white bg-black w-full h-44 mb-3"
          />
        </div>
        <div className="text-sky-500 flex gap-1 border-b-2 border-gray-800">
          <WorldIcon />
          <p className="text-md font-bold mb-3 "> Every can reply</p>
        </div>
        <div className="pt-5">
          <button
            type="submit"
            className="btn btn-sm rounded-full float-end bg-sky-500 hover:bg-sky-600 text-white border-none w-15 md:w-20"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
