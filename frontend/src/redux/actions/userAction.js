import axios from "axios";
import { toast } from "react-toastify";

export const registerApi = async (user, avatar, rejectWithValue) => {
  const { name, email, password } = user;

  try {
    const { data } = await axios.post(
      `/api/v1/regiser`,
      { name, email, password, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Register Success");
    return data.user;
  } catch (error) {
    toast.error(error.response.data.mess);
    return rejectWithValue(error.response.data.mess);
  }
};

export const loginApi = async (user, rejectWithValue) => {
  const { email, password } = user;
  try {
    const { data } = await axios.post(
      `/api/v1/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Login Success");
    return data.user;
  } catch (error) {
    toast.error(error.response.data.mess);
    return rejectWithValue(error.response.data.mess);
  }
};

export const logOutApi = async (rejectWithValue) => {
  try {
    const { data } = await axios.get(`/api/v1/logout`);

    return data.mess;
  } catch (error) {
    toast.error(error.response.data.mess);
    return rejectWithValue(error.response.data.mess);
  }
};
export const myProfileApi = async (rejectWithValue) => {
  try {
    const { data } = await axios.get(`/api/v1/me`);

    return data.user;
  } catch (error) {
    console.log(error.message.data.mess);
    return rejectWithValue(error.response.data.mess);
  }
};

export const allUsersApi = async (rejectWithValue) => {
  try {
    const { data } = await axios.get(`/api/v1/users`);

    return data.users;
  } catch (error) {
    console.log(error.message.data.mess);
    return rejectWithValue(error.response.data.mess);
  }
};

export const updateProfileApi = async (name, email, selectedFile) => {
  try {
    const { data } = await axios.put(
      `/api/v1/update/profile`,
      {
        name,
        email,
        avatar: selectedFile,
      }
    );

    console.log(data);
    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.mess);
  }
};
export const passwordChangeApi = async (
  oldPassword,
  newPassword,
  rejectWithValue
) => {
  try {
    const { data } = await axios.put(
      `/api/v1/update/password`,
      {
        oldPassword,
        newPassword,
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

export const deleteProfileApi = async () => {
  try {
    const { data } = await axios.delete(
      `/api/v1/delete/me`
    );

    toast.success(data.mess);

    return data.mess;
  } catch (error) {
    toast.error(error.response.data.mess);
  }
};
export const forgotPasswordApi = async (email) => {
  try {
    const { data } = await axios.post(
      `/api/v1/forgot/password`,
      {
        email,
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
  }
};
export const resetPasswordApi = async (token, password) => {
  try {
    const { data } = await axios.put(
      `/api/v1/reset/password/${token}`,
      {
        password,
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
  }
};
export const singleUserApi = async (id) => {
  try {
    const { data } = await axios.get(
      `/api/v1/singleuser/${id}`
    );

    toast.success(data.mess);
    return data.user;
  } catch (error) {
    toast.error(error.response.data.mess);
  }
};
export const followUserApi = async (id) => {
  try {
    const { data } = await axios.post(
      `/api/v1/user/${id}`
    );
    console.log(data);
    toast.success(data.mess);
    return data.mess;
  } catch (error) {
    toast.error(error.response.data.mess);
  }
};
