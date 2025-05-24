import PropTypes from 'prop-types';
import FilledLikeIcon from '../icons/FilledLikeIcon';
import LikeIcon from '../icons/LikeIcon';

export default function CommentActions({ post, handleLike, posts }) {
    const onLikeClick = (e) => {
        handleLike(e,post._id, posts); 
    };
    return (
        <>
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-blue-900/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <span className="text-sm">0</span>
            </button>

            <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-green-900/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <span className="text-sm">0</span>
            </button>

            <button className={`flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group ${post.isLiked ? 'text-pink-500' : ''}`} onClick={onLikeClick}>
                <div className="p-2 rounded-full group-hover:bg-red-900/20 transition-colors">
                    {post.isLiked ? <FilledLikeIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <LikeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
                <span className="text-sm">{post.likesCount}</span>
            </button>

            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-blue-900/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                </div>
            </button>
        </>
    )
}

CommentActions.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isLiked: PropTypes.bool,
        likesCount: PropTypes.number,
    }).isRequired,
    handleLike: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};