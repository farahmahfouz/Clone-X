import axiosInstance from "./axiosInstance";

// Get all posts with likes and user details
export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data.data.posts;
};

// Get a single post by ID with likes and user details
export const getPostById = async (id) => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data.data;
};

// Get current user's posts
export const getUserPosts = async () => {
  const response = await axiosInstance.get("/posts/me");
  return response.data.data.posts;
};

// Create a new post
export const createPost = async (postData) => {
  const response = await axiosInstance.post("/posts", postData);
  return response.data;
};

// Update a post
export const updatePost = async (id, postData) => {
  const response = await axiosInstance.patch(`/posts/${id}`, postData);
  return response.data.data.updatePost;
};

// Delete a post
export const deletePost = async (id) => {
  const response = await axiosInstance.delete(`/posts/${id}`);
  return response.data;
};

// Like a post
export const likePost = async (postId) => {
  const response = await axiosInstance.post(`/posts/${postId}/likes`);
  return response.data;
};

// Unlike a post
export const unlikePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}/likes`);
  return response.data;
};

// Get likes for a post
export const getPostLikes = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}/likes`);
  return response.data.data.likes;
};

// Comment operations
export const createComment = async (postId, text) => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, { text });
  return response.data.data.comment;
};

export const getComments = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}/comments`);
  return response.data.data.comments;
};

export const updateComment = async (postId, commentId, text) => {
  const response = await axiosInstance.patch(`/posts/${postId}/comments/${commentId}`, { text });
  return response.data.data.comment;
};

export const deleteComment = async (postId, commentId) => {
  const response = await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
}; 