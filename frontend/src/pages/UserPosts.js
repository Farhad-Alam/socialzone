import { Dialog } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { showAtom } from "../atoms/showProfile";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Profile from "../components/Profile";
import { getMyposts } from "../redux/slices/postSlice";
import {
  authLogout,
  changePassword,
  deleteProfile,
  loadUser,
  updateProfile,
} from "../redux/slices/userSlice";

const UserPosts = () => {
  const dispatch = useDispatch();
  const [shows] = useRecoilState(showAtom);
  const history = useNavigate();
  const { posts } = useSelector((state) => state.post);
  const { loading, user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [upadteProfileModal, setupadteProfileModal] = useState(false);
  const imageRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readEvent) => {
      setSelectedFile(readEvent.target.result);
    };
  };

  const handleLogout = () => {
    dispatch(authLogout());
    history("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(changePassword({ oldPassword, newPassword }));
    setChangePasswordModal(!changePasswordModal);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile({ name, email, selectedFile }));
    await dispatch(loadUser());
    setupadteProfileModal(!upadteProfileModal);
  };

  const handleDeleteProfile = async () => {
    await dispatch(deleteProfile());
  };

  useEffect(async () => {
    await dispatch(getMyposts());
  }, [dispatch]);

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
                isAccount={true}
                isDelete={true}
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
          }
        >
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-8 ">
            <img
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover mx-auto"
              src={user.avatar.url}
              alt=""
            />
            <h1 className="font-semibold text-sm">{user.name}</h1>
            <div
              onClick={() => setFollowerModal(!followerModal)}
              className="shadow-lg px-4 py-2 scale-anim"
            >
              <h3>Followers :</h3>
              <span>{user.followers.length}</span>
            </div>
            <div
              onClick={() => setFollowingModal(!followingModal)}
              className="shadow-lg px-4 py-2 scale-anim"
            >
              <h3>Following :</h3>
              <span>{user.following.length}</span>
            </div>
            <div className="shadow-lg px-4 py-2 scale-anim">
              <h3>Posts :</h3>
              <span>{posts ? posts.length : 0}</span>
            </div>
          </div>
          <div className="space-y-4 text-sm text-center mt-4 md:mt-[10rem]">
            <button className="userButton" onClick={handleLogout}>
              LogOut
            </button>
            <button
              onClick={() => setChangePasswordModal(!changePasswordModal)}
              className="userButton"
            >
              Change your Password
            </button>
            <button
              onClick={() => setupadteProfileModal(!upadteProfileModal)}
              className="userButton"
            >
              Update Your Profile
            </button>
            <button onClick={handleDeleteProfile} className="userButton">
              {!loading ? "Delete Your Profile" : "Deleting..."}
            </button>
          </div>
        </div>
      </div>

      {/* Following Modal */}

      <Dialog
        open={followingModal}
        onClose={() => setFollowingModal(!followingModal)}
      >
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          {user
            ? user.following.map((item) => (
                <Profile
                  key={item._id}
                  avatar={
                    "https://cdn.anime-planet.com/characters/primary/alain-pokemon-xy-mega-evolution-1.jpg?t=1625874156"
                  }
                  name={item.name}
                  userId={item._id}
                />
              ))
            : "No Following"}
        </div>
      </Dialog>

      {/* Followers Modal */}

      <Dialog
        open={followerModal}
        onClose={() => setFollowerModal(!followerModal)}
      >
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          {user
            ? user.followers.map((item) => (
                <Profile
                  key={item._id}
                  avatar={
                    "https://cdn.anime-planet.com/characters/primary/alain-pokemon-xy-mega-evolution-1.jpg?t=1625874156"
                  }
                  name={item.name}
                  userId={item._id}
                />
              ))
            : "No Followers"}
        </div>
      </Dialog>
      {/* Upadte Your Profile Modal */}

      <Dialog
        open={changePasswordModal}
        onClose={() => setChangePasswordModal(!changePasswordModal)}
      >
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          <div>
            <h1 className="text-xl font-bold lg:text-3xl text-center mt-5">
              Change Your Password
            </h1>
            <hr className="border border-black w-[5rem] mx-auto my-4" />
          </div>
          <form onSubmit={handleSubmit} className="md:mt-[5rem]">
            <div className="space-y-10 text-center">
              <div className=" space-y-4">
                <label className="text-lg font-semibold" htmlFor="oldPassword">
                  Old Password :
                </label>
                <input
                  placeholder="Enter ur old password"
                  className="inputButton"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className=" space-y-4">
                <label className="text-lg font-semibold" htmlFor="newPassword">
                  New Password :
                </label>
                <input
                  placeholder="Enter ur new password"
                  className="inputButton"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="">
                <button
                  disabled={!oldPassword || !newPassword}
                  type="submit"
                  className="bg-gradient-to-tr disabled:cursor-not-allowed from-[#380036] to-[#0cbaba] px-4 py-2 rounded-lg text-white text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>
      {/* Change Your Password Modal */}

      <Dialog
        open={upadteProfileModal}
        onClose={() => setupadteProfileModal(!upadteProfileModal)}
      >
        <div className="w-[70vw] md:w-[30rem] bg-white h-[60vh] p-10 font-joseFin">
          <div>
            <h1 className="text-xl font-bold lg:text-3xl text-center mt-5">
              Update Your Profile
            </h1>
            <hr className="border border-black w-[5rem] mx-auto my-4" />
          </div>
          <form onSubmit={handleSubmitProfile} className="md:mt-[5rem]">
            <div className="space-y-10 text-center">
              <div className="">
                <img
                  onClick={() => {
                    imageRef.current.click();
                  }}
                  className="w-14 h-14 shadow-xl shadow-slate-800/50 rounded-full  mx-auto scale-anim object-cover"
                  src={
                    selectedFile
                      ? selectedFile
                      : "https://th.bing.com/th/id/OIP.iJYut0dHXchVowfmwoP8ZwAAAA?pid=ImgDet&rs=1"
                  }
                  alt=""
                />
                <input
                  type="file"
                  name=""
                  onChange={handleImg}
                  ref={imageRef}
                  hidden
                  id=""
                />
              </div>
              <div className=" space-y-4">
                <label className="text-lg font-semibold" htmlFor="oldPassword">
                  Name :
                </label>
                <input
                  placeholder="Enter ur old password"
                  className="inputButton"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" space-y-4">
                <label className="text-lg font-semibold" htmlFor="newPassword">
                  Email :
                </label>
                <input
                  placeholder="Enter ur new password"
                  className="inputButton"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="">
                <button
                  disabled={!name || !email}
                  type="submit"
                  className="bg-gradient-to-tr disabled:cursor-not-allowed from-[#380036] to-[#0cbaba] px-4 py-2 rounded-lg text-white text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default UserPosts;
