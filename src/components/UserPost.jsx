import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import CommentActions from './CommentsActions';

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
                  <CommentActions post={post} handleLike={handleLike} posts={posts} />
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