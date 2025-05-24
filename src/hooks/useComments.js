// import { useState } from "react";
// import { createComment, updateComment, deleteComment } from "../utils/postService"; 


// export default function useComments(postId, initialComments = []) {
//   const [comments, setComments] = useState(initialComments);
//   const [newComment, setNewComment] = useState('');
//   const [editingComment, setEditingComment] = useState(null);

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const comment = await createComment(postId, newComment);
//       setComments(prev => [...prev, comment]);
//       setNewComment('');
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const handleUpdateComment = async (commentId, text) => {
//     try {
//       const updatedComment = await updateComment(postId, commentId, text);
//       setComments(prev =>
//         prev.map(comment =>
//           comment._id === commentId ? updatedComment : comment
//         )
//       );
//       setEditingComment(null);
//     } catch (error) {
//       console.error("Error updating comment:", error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(postId, commentId);
//       setComments(prev => prev.filter(comment => comment._id !== commentId));
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   return {
//     comments,
//     newComment,
//     setNewComment,
//     editingComment,
//     setEditingComment,
//     handleSubmitComment,
//     handleUpdateComment,
//     handleDeleteComment,
//   };
// }
