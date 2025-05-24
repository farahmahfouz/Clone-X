import PropTypes from 'prop-types';
import CommentActions from './CommentsActions';

export default function UserPost({ posts, handleLike, deletePost }) {
  return (
    <div>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-white mb-2">You haven&apos;t posted anything yet</h3>
          <p className="text-gray mb-6">When you post, it&apos;ll show up here.</p>
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
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center">
                    <span className="font-bold text-white truncate capitalize">
                      {post.userId?.name}
                    </span>
                    <span className="text-white/40 text-sm ml-1">
                      @{post.userId?.email?.split('@')[0]}
                    </span>
                    <span className="text-white/40 text-sm mx-1">·</span>
                    <span className="text-white/40 text-xs">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 rounded-full text-white hover:text-white/30 hover:bg-gray/30 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>

                    <div className="absolute right-0 top-full mt-1 bg-black border border-gray-700 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[120px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(post._id);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
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

                <div className="flex items-center justify-between max-w-md text-gray mt-3">
                  <CommentActions post={post} handleLike={handleLike} posts={posts} />
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