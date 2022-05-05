import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  allUsersApi,
  deleteProfileApi,
  followUserApi,
  forgotPasswordApi,
  loginApi,
  logOutApi,
  myProfileApi,
  passwordChangeApi,
  registerApi,
  resetPasswordApi,
  singleUserApi,
  updateProfileApi,
} from "../actions/userAction";

export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ values, selectedFile }, { rejectWithValue }) => {
    return registerApi(values, selectedFile, rejectWithValue);
  }
);
export const authLogin = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    return loginApi(user, rejectWithValue);
  }
);
export const authLogout = createAsyncThunk(
  "auth/logout",
  async (rejectWithValue) => {
    return logOutApi(rejectWithValue);
  }
);
export const loadUser = createAsyncThunk("auth/me", async (rejectWithValue) => {
  return myProfileApi(rejectWithValue);
});

export const getAllUsers = createAsyncThunk(
  "auth/users",
  async (rejectWithValue) => {
    return allUsersApi(rejectWithValue);
  }
);
export const changePassword = createAsyncThunk(
  "auth/changepassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    return passwordChangeApi(oldPassword, newPassword, rejectWithValue);
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotpassword",
  async (email) => {
    return forgotPasswordApi(email);
  }
);
export const updateProfile = createAsyncThunk(
  "auth/updateprofile",
  async ({ name, email, selectedFile }) => {
    return updateProfileApi(name, email, selectedFile);
  }
);
export const deleteProfile = createAsyncThunk(
  "auth/deleteprofile",
  async () => {
    return deleteProfileApi();
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async ({ token, password }) => {
    return resetPasswordApi(token, password);
  }
);
export const singleUser = createAsyncThunk("auth/singleuser", async (id) => {
  return singleUserApi(id);
});
export const followUser = createAsyncThunk("auth/followuser", async (id) => {
  return followUserApi(id);
});

const initialState = {
  user: null,
  singleuser: null,
  users: null,
  loading: false,
  message: "",
  isAuthenticated: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [authRegister.pending]: (state) => {
      state.loading = true;
    },
    [authRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthenticated = true;
      state.error = "";
    },
    [authRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = payload;
    },
    [authLogin.pending]: (state) => {
      state.loading = true;
    },
    [authLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.error = "";
    },
    [authLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    [authLogout.pending]: (state) => {
      state.loading = true;
    },
    [authLogout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [authLogout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = true;
    },
    [loadUser.pending]: (state) => {
      state.loading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.error = "";
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [changePassword.pending]: (state) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteProfile.pending]: (state) => {
      state.loading = true;
    },
    [deleteProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.isAuthenticated = false;
    },
    [deleteProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = true;
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [singleUser.pending]: (state) => {
      state.loading = true;
    },
    [singleUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.singleuser = payload;
    },
    [singleUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [followUser.pending]: (state) => {
      state.loading = true;
    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.mess = payload;
    },
    [followUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
