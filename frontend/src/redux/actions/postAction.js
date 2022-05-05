import axios from "axios";
import { toast } from "react-toastify";

export const getFollowingPost = async () => {
  try {
    const { data } = await axios.get(`/api/v1/posts`);

    return data.post;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};
export const userPostsApi = async (id) => {
  try {
    const { data } = await axios.get(
      `/api/v1/posts/${id}`
    );
    return data.posts;
  } catch (error) {
    console.log(error);
  }
};

export const likeDislikePost = async (postId) => {
  try {
    const { data } = await axios.get(
      `/api/v1/post/${postId}`
    );

    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};

export const commentPost = async (postId, comment) => {
  try {
    const { data } = await axios.post(
      `/api/v1/post/comment/${postId}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);

    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};

export const commentDeletePost = async (postId, commentId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/post/comment/${postId}`,
      {
        data: { commentId },
      }
    );

    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};
export const captionUpdateOfPost = async (caption, postId) => {
  try {
    console.log(caption, postId);
    const { data } = await axios.put(
      `/api/v1/post/${postId}`,
      {
        caption,
      }
    );

    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};

export const createPost = async (image, caption, rejectWithValue) => {
  try {
    const { data } = await axios.post(
      `/api/v1/post/upload`,
      {
        image,
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    toast.error(error.response.data.mess);
    rejectWithValue(error.response.data.mess);
  }
};

export const myPostsApi = async () => {
  try {
    const { data } = await axios.get(`/api/v1/posts/me`);

    return data.posts;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};
export const deletePost = async (postId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/post/${postId}`
    );

    toast.success(data.mess);
    return data.posts;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const postsUserApi = async () => {
  try {
    const { data } = await axios.get(`/api/v1/user/posts`);

    return data.posts;
  } catch (error) {
    console.log(error.response.data.mess);
  }
};
