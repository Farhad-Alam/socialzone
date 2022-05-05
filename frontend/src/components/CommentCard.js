import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyposts,
  postCommentDelete,
  postOfFollowing,
  postsUser,
  userPosts,
} from "../redux/slices/postSlice";

const CommentCard = ({
  postId,
  userId,
  name,
  comment,
  commentId,
  isAccount,
  userPostId,
  userVal,
  homeUser,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleDeleteComment = async () => {
    await dispatch(postCommentDelete({ postId, commentId }));

    if (userVal) {
      await dispatch(userPosts(userPostId));
    }
    if (homeUser) {
      await dispatch(postOfFollowing());
    }
    if (isAccount) {
      await dispatch(getMyposts());
    }
  };

  return (
    <div key={commentId} className="flex justify-between items-center mb-6">
      <Link to={`/user/${userId}`} className="flex space-x-4 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src="https://cdn.anime-planet.com/characters/primary/alain-pokemon-xy-mega-evolution-1.jpg?t=1625874156"
          alt=""
        />
        <div className="">
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="text-sm font-medium">{comment}</p>
        </div>
      </Link>
      {isAccount ? (
        <p className="" onClick={handleDeleteComment}>
          <MdDelete className="text-red-600 scale-anim" size={20} />
        </p>
      ) : (
        userId === user._id && (
          <p className="" onClick={handleDeleteComment}>
            <MdDelete className="text-red-600 scale-anim" size={20} />
          </p>
        )
      )}
    </div>
  );
};

export default CommentCard;
