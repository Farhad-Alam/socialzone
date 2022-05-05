import express from "express";
import {
  commentToPost,
  createPost,
  deleteComment,
  deletePost,
  getAllUserPosts,
  likeandUnlikePost,
  myPosts,
  postofFollowing,
  updatePost,
  userPosts,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeandUnlikePost)
  .delete(isAuthenticated, deletePost)
  .put(isAuthenticated, updatePost);

router
  .route("/post/comment/:id")
  .post(isAuthenticated, commentToPost)
  .delete(isAuthenticated, deleteComment);
router.route("/posts").get(isAuthenticated, postofFollowing);
router.route("/posts/me").get(isAuthenticated, myPosts);
router.route("/posts/:id").get(isAuthenticated, userPosts);
router.route("/user/posts").get(isAuthenticated, getAllUserPosts);

export default router;
