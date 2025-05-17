import { useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import WorldIcon from "../icons/WorldIcon";
import { AuthContext } from "../auth/Auth";
import { createPost } from "../utils/postService";

export default function AddPost({ onClose, onSuccess }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useContext(AuthContext);

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
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error adding post:", error);
      setError(error.message || "Failed to add post");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const modal = document.getElementById("add_post_modal");
    if (modal) {
      modal.showModal();
    }
  }, []);

  return (
    <dialog id="add_post_modal" className="modal backdrop-blur backdrop:bg-gray-800/60">
      <div className="modal-box bg-black max-w-2xl w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white" onClick={onClose}>✕</button>
        </form>
        
        <form onSubmit={addPost}>
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
              disabled={loading || !content}
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
    </dialog>
  );
}

AddPost.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
};