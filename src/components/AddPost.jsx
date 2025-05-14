import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WorldIcon from "../icons/WorldIcon";
import { AuthContext } from "../auth/Auth";
import { createPost } from "../utils/postService";

export default function AddPost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const addPost = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError("Please login first");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await createPost({ content });
      navigate("/home");
    } catch (error) {
      console.error("Error adding post:", error);
      setError(error.message || "Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Please login to add a post</h2>
          <button 
            onClick={() => navigate("/login")}
            className="btn rounded-full bg-sky-500 hover:bg-sky-600 text-white border-none"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <form
        onSubmit={addPost}
        className="md:w-1/2 p-5 rounded-3xl border border-gray-800 bg-black h-80"
      >
        <div className="flex">
          <img
            className="w-[60px] h-[60px] rounded-full object-cover"
            src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt={user?.name || "User"}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's Happening?!"
            className="textarea textarea-bordered text-lg text-white bg-black w-full h-44 mb-3"
            disabled={loading}
          />
        </div>
        <div className="text-sky-500 flex gap-1 border-b-2 border-gray-800">
          <WorldIcon />
          <p className="text-md font-bold mb-3">Everyone can reply</p>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
        <div className="pt-5">
          <button
            type="submit"
            className="btn btn-sm rounded-full float-end bg-sky-500 hover:bg-sky-600 text-white border-none w-15 md:w-20"
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
