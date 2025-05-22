import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getUserPosts, deletePost as deletePostService } from '../utils/postService';
import { getCurrentUser, updateProfile } from '../utils/userService';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState({ profile: null, cover: null });
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

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

  // useEffect(() => {
  //   if (userData?.image) {
  //     setImagePreview(prev => ({ ...prev, profile: null }));
  //   }
  //   if (userData?.coverImage) {
  //     setImagePreview(prev => ({ ...prev, cover: null }));
  //   }
  // }, [userData?.image, userData?.coverImage]);
  

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview immediately
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

      // Clear preview after successful upload
        setImagePreview(prev => ({
          ...prev,
          [type]: null
        }));
    } catch (error) {
      console.error("Error uploading image:", error);
      // Clear preview on error
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

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
    <div className="bg-black min-h-screen">
      {/* Header with back arrow */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center px-4 py-3">
          <button className="p-2 rounded-full hover:bg-gray-900 transition-colors mr-8">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
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

          <Link
            to="/edit-profile"
            className="mt-4 px-6 py-2 border border-gray-600 text-white rounded-full hover:bg-gray-900 transition-colors font-medium"
          >
            Edit profile
          </Link>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1 capitalize">{userData?.name}</h2>
          <p className="text-white/40 mb-4">@{userData?.email?.split('@')[0]}</p>

          {userData?.bio && (
            <p className="text-white mb-4">{userData.bio}</p>
          )}

          <div className="flex items-center gap-6 text-white/40">
            {userData?.location && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{userData.location}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                Joined {new Date(userData?.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-6 mt-4">
            <span className="text-white">
              <span className="font-bold">120</span> <span className="text-gray-500">Following</span>
            </span>
            <span className="text-white">
              <span className="font-bold">1,234</span> <span className="text-gray-500">Followers</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
      <div>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-white mb-2">You haven&apos;t posted anything yet</h3>
            <p className="text-gray mb-6">When you post, it&apos;ll show up here.</p>
            <Link
              to="/create-post"
              className="inline-block px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="border-b border-gray px-4 py-3 hover:bg-gray-950/50 transition-colors">
              <div className="flex gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  src={post.userId?.image || '/default.jpg'}
                  alt="avatar"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white truncate capitalize">
                      {post.userId?.name}
                    </span>
                    <span className="text-white/40 text-sm">
                      @{post.userId?.email?.split('@')[0]}
                    </span>
                    <span className="text-white/40 text-sm">·</span>
                    <span className="text-white/40 text-xs">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    {/* Dropdown menu */}
                    <div className="ml-auto relative group">
                      <button className="p-1 rounded-full hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100">
                        <svg className="w-4 h-4 text-gray" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 000 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-white whitespace-pre-wrap">{post.content}</p>
                    {post.images && post.images.length > 0 && (
                      <div className="mt-3 rounded-2xl overflow-hidden">
                        {post.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-auto border border-gray"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between max-w-md text-gray">
                    <button className="flex items-center gap-2 p-2 rounded-full hover:bg-blue-900/20 hover:text-blue-400 transition-colors group">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">0</span>
                    </button>

                    <button className="flex items-center gap-2 p-2 rounded-full hover:bg-green-900/20 hover:text-green-400 transition-colors group">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm">0</span>
                    </button>

                    <button className="flex items-center gap-2 p-2 rounded-full hover:bg-red-900/20 hover:text-red-400 transition-colors group">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm">0</span>
                    </button>

                    <div className="flex gap-2">
                      <Link
                        to='#'
                        className="p-2 rounded-full hover:bg-blue-900/20 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>

                      <button
                        onClick={() => deletePost(post._id)}
                        className="p-2 rounded-full hover:bg-red-900/20 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}