import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPosts } from "../redux/slices/postSlice";
import Navbar from "./Navbar";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { followUser, singleUser } from "../redux/slices/userSlice";
import { showAtom } from "../atoms/showProfile";
import { useRecoilState } from "recoil";

const User = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [follow, setFollow] = useState(false);
  const { posts } = useSelector((state) => state.post);
  const { singleuser, user } = useSelector((state) => state.user);
  const params = useParams();
  const id = params.id;
  const [shows] = useRecoilState(showAtom);

  useEffect(async () => {
    await dispatch(userPosts(id));
    await dispatch(singleUser(id));
  }, [dispatch, id]);

  const handleFollow = async () => {
    await dispatch(followUser(id));
    setFollow(!follow);
  };

  useEffect(() => {
    if (user?._id === id) {
      setShow(false);
    } else if (singleuser) {
      singleuser.followers.forEach((item) => {
        if (item._id === user?._id) {
          setFollow(true);
        }
      });
    }
  }, [singleuser, user?.id, id]);

  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <Navbar />
      <div className="max-w-6xl gap-x-4 mx-auto w-full flex flex-1 md:grid md:grid-cols-4">
        {/* Left */}
        <div className="flex-[1] md:col-span-3 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 h-screen">
          {posts && posts.length > 0 ? (
            posts?.map((item) => (
              <Post
                key={item._id}
                postId={item._id}
                postImg={item.image.url}
                caption={item.caption}
                likes={item.likes}
                comments={item.comments}
                name={item.owner.name}
                userPostId={params.id}
                userVal={true}
              />
            ))
          ) : (
            <div className="text-3xl p-10 font-joseFin ">No Post Yet...</div>
          )}
        </div>
        {/* Right */}
        <div
        className={
          shows === true
            ? "flex-[.8] overflow-hidden h-screen col-span-1 bg-white scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-300"
            : "flex-[0] overflow-hidden h-screen col-span-1 bg-white scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-300"
        } >
          {/* Right */}
          <div className="flex flex-col items-center text-center space-y-8 ">
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto"
              src={singleuser?.avatar.url}
              alt=""
            />
            <h1 className="font-semibold text-sm">{singleuser?.name}</h1>
            <div className="shadow-lg px-4 py-2 scale-anim">
              <h3>Followers :</h3>
              <span>{singleuser?.followers.length}</span>
            </div>
            <div className="shadow-lg px-4 py-2 scale-anim">
              <h3>Following :</h3>
              <span>{singleuser?.following.length}</span>
            </div>
            <div className="shadow-lg px-4 py-2 scale-anim">
              <h3>Posts :</h3>
              <span>{posts ? posts.length : 0}</span>
            </div>
          </div>
          {show && (
            <div className="space-y-4 text-sm text-center mt-[10rem]">
              <button onClick={handleFollow} className="userButton">
                {follow ? "UnFollow" : "Follow"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default User;
