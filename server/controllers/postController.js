import { Post } from "../models/Post.js";
import cloudinary from "cloudinary";
import { User } from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!caption && !image) {
      return res.status(404).json({
        success: false,
        mess: "Please fill all the field",
      });
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "posts",
      });

      const post = await Post.create({
        caption,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        owner: req.user._id,
      });

      req.user.posts.push(post._id);

      await req.user.save();

      res.status(201).json({
        success: true,
        post,
        mess: "Post Created Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        mess: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        mess: "UnAuthorized",
      });
    } else {
      await cloudinary.v2.uploader.destroy(post.image.public_id);

      await post.remove();

      const user = req.user;
      if (user.posts.includes(post._id)) {
        const index = user.posts.indexOf(post._id);

        user.posts.splice(index, 1);
        await user.save();
      }
      res.status(200).json({
        success: true,
        mess: "Post has been Deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const likeandUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        mess: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        mess: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();

      return res.status(200).json({
        success: true,
        mess: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const commentToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        mess: "Post not found",
      });
    } else if (!req.body.comment) {
      return res.status(404).json({
        success: false,
        mess: "Please fill the Comment",
      });
    }

    let commentIndex = -1;

    // Checking if comment already exixts
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;

      await post.save();
      return res.status(200).json({
        success: true,
        mess: "Comment Updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.status(200).json({
        success: true,
        mess: "Comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        mess: "Post not found",
      });
    }

    // Checking if owner wants to delete a comment
    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId == undefined) {
        return res.status(400).json({
          success: false,
          mess: "CommentId not found",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();
      return res.status(200).json({
        success: true,
        mess: "Selected comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();

      res.status(200).json({
        success: true,
        mess: "Your comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const postofFollowing = async (req, res) => {
  try {
    const user = req.user;

    const post = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        mess: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        mess: "UnAuthorized",
      });
    } else {
      post.caption = req.body.caption;
      await post.save();

      res.status(200).json({
        success: true,
        mess: "Post Updated Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const myPosts = async (req, res) => {
  try {
    const user = req.user;

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};
export const userPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};

export const getAllUserPosts = async (req, res) => {
  try {
    const user = await User.find({});
    const posts = await Post.find();

    console.log(user);
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: error.message,
    });
  }
};
