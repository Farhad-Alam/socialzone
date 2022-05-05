import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  captionUpdateOfPost,
  commentDeletePost,
  commentPost,
  createPost,
  deletePost,
  getFollowingPost,
  likeDislikePost,
  myPostsApi,
  postsUserApi,
  userPostsApi,
} from "../actions/postAction";

export const postOfFollowing = createAsyncThunk(
  "post/postOfFollowing",
  async () => {
    return getFollowingPost();
  }
);
export const userPosts = createAsyncThunk("post/userposts", async (id) => {
  return userPostsApi(id);
});

export const postLikeDislike = createAsyncThunk(
  "post/likeDislike",
  async (postId) => {
    return likeDislikePost(postId);
  }
);

export const postComment = createAsyncThunk(
  "post/comment",
  async ({ postId, comment }) => {
    return commentPost(postId, comment);
  }
);

export const postCommentDelete = createAsyncThunk(
  "post/deleteComment",
  async ({ postId, commentId }) => {
    return commentDeletePost(postId, commentId);
  }
);
export const postCreate = createAsyncThunk(
  "post/create",
  async ({ selectedFile, comment }, { rejectWithValue }) => {
    return createPost(selectedFile, comment, rejectWithValue);
  }
);

export const getMyposts = createAsyncThunk("post/myposts", async () => {
  return myPostsApi();
});

export const updateCaption = createAsyncThunk(
  "post/updatecaption",
  async ({ captionUpdate, postId }) => {
    return captionUpdateOfPost(captionUpdate, postId);
  }
);

export const postDelete = createAsyncThunk(
  "post/deletepost",
  async (postId) => {
    return deletePost(postId);
  }
);

export const postsUser = createAsyncThunk("post/postUser", async () => {
  return postsUserApi();
});

const initialState = {
  post: null,
  posts: null,
  loading: false,
  error: "",
  message: "",
  userposts: null,
  singleUserPosts: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [postOfFollowing.pending]: (state) => {
      state.loading = true;
    },
    [postOfFollowing.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
      state.error = "";
    },
    [postOfFollowing.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [postLikeDislike.pending]: (state) => {
      state.loading = true;
    },
    [postLikeDislike.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [postLikeDislike.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [postComment.pending]: (state) => {
      state.loading = true;
    },
    [postComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [postComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [postCommentDelete.pending]: (state) => {
      state.loading = true;
    },
    [postCommentDelete.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [postCommentDelete.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [postCreate.pending]: (state) => {
      state.loading = true;
    },
    [postCreate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [postCreate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [getMyposts.pending]: (state) => {
      state.loading = true;
    },
    [getMyposts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.error = "";
    },
    [getMyposts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [updateCaption.pending]: (state) => {
      state.loading = true;
    },
    [updateCaption.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [updateCaption.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [postDelete.pending]: (state) => {
      state.loading = true;
    },
    [postDelete.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [postDelete.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
      state.error = payload;
    },
    [postsUser.pending]: (state) => {
      state.loading = true;
    },
    [postsUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userposts = payload;
      state.error = "";
    },
    [postsUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.userposts = "";
      state.error = payload;
    },
    [userPosts.pending]: (state) => {
      state.loading = true;
    },
    [userPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.isAuthenticated = true;
      state.error = "";
    },
    [userPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.posts = "";
      state.isAuthenticated = false;
    },
  },
});

export default postSlice.reducer;
