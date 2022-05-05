import React, { useEffect } from "react";
import Post from "./Post";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { postOfFollowing } from "../redux/slices/postSlice";
import { getAllUsers } from "../redux/slices/userSlice";
import { showAtom } from "../atoms/showProfile";
import { useRecoilState } from "recoil";

const Posts = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { users } = useSelector((state) => state.user);
  const [shows] = useRecoilState(showAtom);

  useEffect(() => {
    dispatch(postOfFollowing(), dispatch(getAllUsers()));
  }, [dispatch]);

  console.log(shows);
  return (
    <section className="max-w-6xl gap-x-4 mx-auto w-full flex flex-1 md:grid md:grid-cols-4">
      {/* Left */}
      <div className="flex-[1] md:col-span-3 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 h-screen ">
        {post && post.length > 0 ? (
          post?.map((item) => (
            <Post
              key={item._id}
              postId={item._id}
              postImg={item.image.url}
              caption={item.caption}
              likes={item.likes}
              comments={item.comments}
              name={item.owner.name}
              isAccount={false}
              homeUser={true}
            />
          ))
        ) : (
          <div className="text-3xl p-10 font-joseFin ">
            Follow SomeOne to see his POSTS ...
          </div>
        )}
      </div>
      {/* Right */}
      <div
        className={
          shows === true
            ? "flex-[.8] overflow-hidden h-screen col-span-1 bg-white scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-300"
            : "flex-[0] overflow-hidden h-screen col-span-1 bg-white scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-gray-300"
        }
      >
        {users?.map((item) => {
          return (
            <Profile
              key={item._id}
              userId={item._id}
              name={item.name}
              avatar={item.avatar.url}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Posts;
