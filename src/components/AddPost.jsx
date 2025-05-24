import { useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import WorldIcon from "../icons/WorldIcon";
import { AuthContext } from "../auth/Auth";
import { createPost } from "../utils/postService";

export default function AddPost({ onClose, onSuccess }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user, isAuthenticated } = useContext(AuthContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const addPost = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError("Please login first");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('content', content);
      if (selectedImage) {
        formData.append('images', selectedImage);
      }
      await createPost(formData);
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
              src={user?.image || '/default.jpg'}
              alt={user?.name || "User"}
            />
            <div className="w-full">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's Happening?!"
                className="textarea textarea-bordered text-lg text-white bg-black w-full h-44 mb-3"
                disabled={loading}
              />
              {imagePreview && (
                <div className="relative mb-3">
                  <img src={imagePreview} alt="Preview" className="max-h-60 rounded-lg" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 btn btn-circle btn-sm bg-black/50 text-white hover:bg-black/70"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
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
          <div className="pt-5 flex justify-between items-center">
            <div>
              <label className="btn btn-sm btn-circle btn-ghost text-primary">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={loading}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-sm rounded-full bg-primary hover:bg-sky-600 text-white border-none w-15 md:w-20"
              disabled={loading || (!content && !selectedImage)}
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