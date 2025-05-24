import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import { createComment, updateComment, deleteComment } from '../utils/postService';
import CommentActions from './CommentsActions';

export default function CommentsPost({ postId, initialComments }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const comment = await createComment(postId, newComment);
      setComments(prev => [...prev, comment]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId, text) => {
    try {
      const updatedComment = await updateComment(postId, commentId, text);
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      setEditingComment(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(postId, commentId);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <div className="border-t border-gray min-h-screen">
      {/* Comment Input Section */}
      <div className="p-4 border-b border-gray">
        <form onSubmit={handleSubmitComment} className="flex gap-3">
          <div className="flex-shrink-0">
            <img
              src={user?.image || '/default.jpg'}
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Post your reply"
                className="w-full bg-transparent text-white text-xl placeholder-gray resize-none border-none outline-none min-h-[60px] py-1"
                rows="1"
                style={{ 
                  resize: 'none',
                  overflow: 'hidden'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-4 text-blue-400">
                {/* Reply actions */}
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                  </svg>
                </button>
                <button type="button" className="hover:bg-blue-900/20 p-2 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray">
                  <span className={newComment.length > 240 ? 'text-red-500' : newComment.length > 200 ? 'text-yellow-500' : ''}>
                    {280 - newComment.length}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting || newComment.length > 280}
                  className="bg-blue-500 text-white px-6 py-1.5 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Reply'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-gray">
        {comments.map((comment) => (
          <div key={comment._id} className="p-4 transition-colors">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <img
                  src={comment.user.image || '/default.jpg'}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white hover:underline cursor-pointer capitalize">
                    {comment.user.name}
                  </span>
                  <span className="text-gray text-sm">
                    @{user.email.split('@')[0]}
                  </span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-500 text-sm hover:underline cursor-pointer">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>

                {editingComment === comment._id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateComment(comment._id, e.target.editText.value);
                    }}
                    className="mt-2"
                  >
                    <textarea
                      name="editText"
                      defaultValue={comment.text}
                      className="w-full bg-black text-white rounded-lg px-3 py-2 text-sm border border-gray focus:border-blue-500 focus:outline-none resize-none"
                      rows="2"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingComment(null)}
                        className="border border-gray-600 text-white px-4 py-1 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-white mt-1 font-thin leading-relaxed whitespace-pre-wrap">
                      {comment.text}
                    </p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center justify-between mt-3 max-w-md">
                      <CommentActions post={{ isLiked: false, likesCount: 0 }}/>

                      {user && user._id === comment.user._id && (
                        <div className="relative group">
                          <button className="p-2 rounded-full text-gray hover:text-gray-300 hover:bg-gray-800 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                          <div className="absolute right-0 top-full mt-1 bg-black border border-gray-700 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[120px]">
                            <button
                              onClick={() => setEditingComment(comment._id)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="p-8 text-center text-gray">
          <p className="text-lg">No replies yet</p>
          <p className="text-sm mt-1">Be the first to reply!</p>
        </div>
      )}
    </div>
  );
}

CommentsPost.propTypes = {
    initialComments: PropTypes.array.isRequired,
    postId: PropTypes.any.isRequired
};