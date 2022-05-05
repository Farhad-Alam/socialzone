import { sendEmail } from "../middlewares/sendEmail.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

export const userRegister = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!avatar) {
      return res.status(404).json({
        success: false,
        mess: "Please add your avatar",
      });
    } else if (user) {
      return res.status(400).json({
        success: false,
        mess: "User already exists",
      });
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "user",
      });

      user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });

      const token = await user.generateToken();

      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        })
        .json({
          success: true,
          user,
          token,
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        mess: "User doesn't exists",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        mess: "Invalid Email or Password",
      });
    }

    const token = await user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const userLogOut = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        mess: "User Logout Successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        mess: "Please fill the fields",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        mess: "Incorrect old Password",
      });
    } else {
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        mess: "Password Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        mess: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset/password/${resetPasswordToken}`;

    const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email,
        subject: "Reset your password",
        message,
      });

      res.status(200).json({
        success: true,
        mess: `Email sent to ${email}`,
        message,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        mess: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        mess: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      mess: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    const user = req.user;

    if (!avatar) {
      return res.status(404).json({
        success: false,
        mess: "Please add your avatar",
      });
    }

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "user",
    });

    if (myCloud) {
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      success: true,
      mess: "Profile Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const userFollow = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const logedInUser = req.user;

    if (!userFollow) {
      return res.status(404).json({
        success: false,
        mess: "User not found",
      });
    }

    if (logedInUser.following.includes(userToFollow._id)) {
      const indexOfFollowers = userToFollow.followers.indexOf(logedInUser._id);
      const indexOfFollowing = logedInUser.following.indexOf(userToFollow._id);

      userToFollow.followers.splice(indexOfFollowers, 1);
      logedInUser.following.splice(indexOfFollowing, 1);

      await userToFollow.save();
      await logedInUser.save();

      res.status(200).json({
        success: true,
        mess: "User UnFollowed",
      });
    } else {
      logedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(logedInUser._id);

      await logedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        mess: "User Followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const deleteMyProfile = async (req, res) => {
  try {
    const user = req.user;
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // Delete avatar of User
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();
    // logout user after deleting profile

    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    // delete all posts

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    // remove user from followeers following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // remove user from  following's follower
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);
      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    // remove all comments of user from al  the posts
    const allPosts = await Post.find();
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user.toString() === userId.toString()) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      mess: "Profile deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "following followers"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        mess: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};
