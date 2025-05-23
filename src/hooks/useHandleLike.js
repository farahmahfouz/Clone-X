import { likePost, unlikePost } from '../utils/postService';

export const useHandleLike = (setPosts) => {
  const handleLike = async (e, postId, posts) => {
    e.stopPropagation();
    try {
      const post = posts.find(p => p._id === postId);
      if (!post) return;

      if (post.isLiked) {
        setPosts(prev => prev.map(p =>
          p._id === postId ? { ...p, isLiked: false, likesCount: p.likesCount - 1 } : p
        ));
        await unlikePost(postId);
      } else {
        setPosts(prev => prev.map(p =>
          p._id === postId ? { ...p, isLiked: true, likesCount: p.likesCount + 1 } : p
        ));
        await likePost(postId);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return handleLike;
};
