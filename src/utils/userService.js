import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/users/login", credentials);
  return response.data;
};

export const signup = async (userData) => {
    const response = await axiosInstance.post("/users/signup", userData);
    return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get("/users/logout");
  return response.data;
};

// User Profile
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data.data.user;
};

export const updateProfile = async (userData) => {
  const response = await axiosInstance.patch("/users/updateMe", userData);
  return response.data.data.user;
};

export const updatePassword = async (passwordData) => {
  const response = await axiosInstance.patch(
    "/users/updateMyPassword",
    passwordData
  );
  return response.data;
};

// Password Reset
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/users/forgotPassword", { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axiosInstance.patch(`/users/resetPassword/${token}`, {
    password,
  });
  return response.data;
};

// Admin Operations
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.data.users;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data.data.user;
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.patch(`/users/${id}`, userData);
  return response.data.data.user;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
