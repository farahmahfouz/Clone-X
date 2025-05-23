import { Link } from "react-router-dom";
import FilledLikeIcon from "../icons/FilledLikeIcon";
import LikeIcon from "../icons/LikeIcon";
import PropTypes from 'prop-types';

export default function UserPost({ posts, handleLike, deletePost }) {
  return (
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

                  <button className={`flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-full hover:bg-pink-900/20 hover:text-pink-600 ${post.isLiked ? 'text-pink-500' : ''} transition-colors group`} onClick={(e) => handleLike(e, post._id)}>
                    {post.isLiked ? <FilledLikeIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <LikeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}  
                    <span className="text-xs sm:text-sm">{post.likesCount}</span>
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
  );
}

UserPost.propTypes = {
  posts: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};