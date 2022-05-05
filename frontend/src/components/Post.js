import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiCommentDots } from "react-icons/bi";
import { RiShareLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyposts,
  postComment,
  postDelete,
  postLikeDislike,
  postOfFollowing,
  updateCaption,
  userPosts,
} from "../redux/slices/postSlice";
import { Dialog } from "@mui/material";
import CommentCard from "./CommentCard";
import { MdDelete } from "react-icons/md";

const Post = ({
  caption,
  postId,
  postImg,
  likes,
  comments,
  name,
  isAccount,
  userPostId,
  userVal,
  homeUser,
}) => {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [captionUpdate, setCaptionUpdate] = useState(caption);
  const [likeModal, setLikeModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [captionModal, setCaptionModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Like a Post
  const handleLike = async () => {
    setLike(!like);
    await dispatch(postLikeDislike(postId));
    if (userVal) {
      await dispatch(userPosts(userPostId));
    }
    if (isAccount) {
      await dispatch(getMyposts());
    } else {
      await dispatch(postOfFollowing());
    }
  };

  // Comment to a Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postComment({ postId, comment }));
    if (userVal) {
      await dispatch(userPosts(userPostId));
    }
    if (isAccount) {
      await dispatch(getMyposts());
    } else {
      await dispatch(postOfFollowing());
    }
    setComment("");
  };

  const handleCaptionUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateCaption({ captionUpdate, postId }));
    await dispatch(getMyposts());
    setCaptionModal(!captionModal);
  };

  const handleDeletePost = async () => {
    alert("Are You Sure??");
    await dispatch(postDelete(postId));
    dispatch(getMyposts());
  };

  useEffect(() => {
    likes?.map((item) => {
      if (item._id === user?._id) {
        setLike(true);
      } else if (item._id === userPostId) {
        setLike(true);
      }
    });
  }, [likes, user?._id]);

  return (
    <div className="mb-8 last:mb-[9rem]">
      <div className="p-5 lg:px-10 space-y-6 border bg-white rounded-lg shadow-xl">
        {/* Top */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <h1 className="text-sm font-medium font-joseFin">{caption}</h1>
            {isAccount && (
              <HiOutlineDotsVertical
                size={20}
                className="scale-anim"
                onClick={() => setCaptionModal(!captionModal)}
              />
            )}
          </div>
          <img className="mx-auto" src={postImg} alt="" />
        </div>
        {/* MID */}
        <div className="flex items-center space-x-2 border-b pb-4">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src="https://cdn.anime-planet.com/characters/primary/alain-pokemon-xy-mega-evolution-1.jpg?t=1625874156"
            alt=""
          />
          <h1 className="text-sm font-semibold">{name}</h1>
        </div>
        {/* CEnter */}
        <div className="flex justify-between items-center px-4 border-b pb-4">
          <div
            onClick={() => {
              setLikeModal(!likeModal);
            }}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <AiFillLike size={20} className="text-emerald-500" />
            <span className="text-sm font-semibold">{likes?.length}</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <BiCommentDots size={20} className="text-emerald-500" />
            <span className="text-sm font-semibold">{comments.length}</span>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-between">
          <div className="flex space-x-10 ">
            <button onClick={handleLike}>
              {like ? (
                <AiFillLike className="scale-anim text-red-500" size={25} />
              ) : (
                <AiOutlineLike className="scale-anim" size={25} />
              )}
            </button>

            <BiCommentDots
              onClick={() => {
                setCommentModal(!commentModal);
              }}
              className="scale-anim"
              size={25}
            />
            <RiShareLine className="scale-anim" size={25} />
          </div>
          {isAccount && (
            <MdDelete
              className="scale-anim text-red-600"
              size={25}
              onClick={handleDeletePost}
            />
          )}
        </div>
      </div>
      {/*Like Dialog ox */}

      <Dialog open={likeModal} onClose={() => setLikeModal(!likeModal)}>
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          <h1 className="text-2xl text-center font-semibold mb-8">
            Liked by..
          </h1>
          {likes.length ? (
            likes.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex items-center space-x-4 mb-4"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src="https://cdn.anime-planet.com/characters/primary/alain-pokemon-xy-mega-evolution-1.jpg?t=1625874156"
                    alt=""
                  />
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              );
            })
          ) : (
            <div className="text-xl text-center text-cyan-400 mt-20">
              No Likes Yet
            </div>
          )}
        </div>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog
        open={commentModal}
        onClose={() => setCommentModal(!commentModal)}
      >
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          <form
            onSubmit={handleSubmit}
            className="flex bg-gray-200 rounded-full mb-10"
          >
            <input
              type="text"
              className="outline-none bg-gray-200 w-full px-4 rounded-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="bg-lime-300 p-2 rounded-r-full">
              Post
            </button>
          </form>
          {comments.length ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                isAccount={isAccount}
                postId={postId}
                {...item}
                userId={item.user._id}
                commentId={item._id}
                userPostId={userPostId}
                userVal={userVal}
                homeUser={homeUser}
              />
            ))
          ) : (
            <div className="text-xl text-center text-cyan-400 mt-20">
              No Comments Yet
            </div>
          )}
        </div>
      </Dialog>
      {/* update Caption Dialog */}
      <Dialog
        open={captionModal}
        onClose={() => setCaptionModal(!captionModal)}
      >
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          <form
            onSubmit={handleCaptionUpdate}
            className="flex bg-gray-200 rounded-full mb-10"
          >
            <input
              type="text"
              className="outline-none bg-gray-200 w-full px-4 rounded-full"
              value={captionUpdate}
              onChange={(e) => setCaptionUpdate(e.target.value)}
            />
            <button type="submit" className="bg-lime-300 p-2 rounded-r-full">
              Post
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
