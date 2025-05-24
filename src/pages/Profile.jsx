import { useEffect, useState, useRef } from "react";
import { getUserPosts, deletePost as deletePostService } from '../utils/postService';
import { getCurrentUser, updateProfile } from '../utils/userService';
import { ArrowLeft } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";
import { useHandleLike } from "../hooks/useHandleLike";
import UserPost from "../components/UserPost";
import UserInfo from "../components/UserInfo";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState({ profile: null, cover: null });
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleLike = useHandleLike(setPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, userPosts] = await Promise.all([
          getCurrentUser(),
          getUserPosts()
        ]);
        setUserData(user);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(prev => ({
        ...prev,
        [type]: event.target.result
      }));
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const formData = new FormData();

      if (type === 'profile') {
        formData.append('image', file);
      } else if (type === 'cover') {
        formData.append('coverImage', file);
      }

      const updatedUser = await updateProfile(formData);

      if (updatedUser.image) {
        updatedUser.image = `${updatedUser.image}?t=${Date.now()}`;
      }
      if (updatedUser.coverImage) {
        updatedUser.coverImage = `${updatedUser.coverImage}?t=${Date.now()}`;
      }

      setUserData(updatedUser);

      setImagePreview(prev => ({
        ...prev,
        [type]: null
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setImagePreview(prev => ({
        ...prev,
        [type]: null
      }));
    } finally {
      setUploading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePostService(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
       await updateProfile(profileData);
      setUserData((prev) => ({
        ...prev,
        ...profileData,
      }));
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-black h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-xl text-primary"></span>
    </div>
    );
  }

  if (error) return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <p className="text-white text-center">Error: {error.message}</p>
    </div>
  );

  const getImageUrl = (url) => {
    if (!url) return '/default.jpg';
    return url.includes('?') ? url : `${url}?t=${Date.now()}`;
  };

  const currentProfileImage = imagePreview.profile || (userData?.image ? getImageUrl(userData.image) : '/default.jpg');
  const currentCoverImage = imagePreview.cover || (userData?.coverImage ? getImageUrl(userData.coverImage) : '/default-cover.jpg');

  return (
    <div className="h-full">
      {/* Header with back arrow */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center px-4 py-3">
          <button className="p-2 rounded-full text-white hover:bg-gray-900 transition-colors mr-8"
            onClick={() => window.history.back()}>
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white capitalize">{userData?.name}</h1>
            <p className="text-sm text-white/50">{posts.length} posts</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 sm:h-64">
        <img
          key={`${currentCoverImage}-${Date.now()}`}
          src={currentCoverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        <input
          type="file"
          ref={coverImageInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'cover')}
        />
        <button
          onClick={() => coverImageInputRef.current?.click()}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
          disabled={uploading}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="relative -mt-16">
            <img
              key={`${currentProfileImage}-${Date.now()}`}
              src={currentProfileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-black object-cover"
            />
            <input
              type="file"
              ref={profileImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'profile')}
            />
            <button
              onClick={() => profileImageInputRef.current?.click()}
              className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
              disabled={uploading}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="mt-4 px-6 py-2 border border-gray text-white rounded-full hover:bg-gray-900 transition-colors font-medium"
          >
            Edit profile
          </button>
        </div>

        <UserInfo userData={userData}/>
      </div>

      <div className="border-b border-gray">
        <div className="flex">
          <button className="flex-1 py-4 text-white font-medium border-b-2 border-blue-500">
            Posts
          </button>
          <button className="flex-1 py-4 text-white/20 font-medium hover:bg-gray-900/50 transition-colors">
            Replies
          </button>
          <button className="flex-1 py-4 text-white/20 font-medium hover:bg-gray-900/50 transition-colors">
            Media
          </button>
          <button className="flex-1 py-4 text-white/20 font-medium hover:bg-gray-900/50 transition-colors">
            Likes
          </button>
        </div>
      </div>

      {/* Posts */}
      <UserPost posts={posts} deletePost={deletePost} handleLike={handleLike} />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}