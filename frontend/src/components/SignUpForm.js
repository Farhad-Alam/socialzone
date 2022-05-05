import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { loginAtom } from "../atoms/logInAtom";
import { authRegister } from "../redux/slices/userSlice";
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [logIn, setLogIn] = useRecoilState(loginAtom);
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

  const onSubmitForm = async (values) => {
    await dispatch(authRegister({ values, selectedFile }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-[90%] sm:w-[80%] lg:w-[40%] shadow-xl">
      {/* Left */}
      <div className="p-10">
        <img
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          className="w-[30rem]"
          alt=""
        />
        <p className="font-joseFin px-4 mt-5 text-right sm:text-center">
          Already a Member?
          <span
            onClick={() => setLogIn(!logIn)}
            className="text-lime-400 font-semibold ml-2 border-b scale-anim inline-block cursor-pointer border-lime-400 py-1"
          >
            Sign In
          </span>
        </p>
      </div>
      {/* Right */}
      <div className="bg-white font-joseFin p-10">
        <h1 className="text-3xl font-semibold mb-4 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
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
          <div className="flex flex-col space-y-3">
            <label className="" htmlFor="Name">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              className={`signinButton ${errors.name && "ring-2 ring-red-400"}`}
              {...register("name", {
                required: {
                  value: true,
                  message: "You must enter your Name",
                },
              })}
            />
            <span className="text-xs text-orange-500 ml-auto">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="" htmlFor="Email">
              Email
            </label>
            <input
              name="email"
              placeholder="Enter Your Email"
              className={`signinButton ${
                errors.email && "ring-2 ring-red-400"
              }`}
              {...register("email", {
                required: {
                  value: true,
                  message: "You must enter your Email",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
                minLength: {
                  value: 2,
                  message: "This is not enough to be an Email",
                },
                maxLength: {
                  value: 120,
                  message: "This is too long",
                },
              })}
            />
            <span className="text-xs text-orange-500 ml-auto">
              {errors?.email?.message}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="" htmlFor="Password">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className={`signinButton ${
                errors?.password && "ring-2 ring-red-400"
              }`}
              {...register("password", {
                required: {
                  value: true,
                  message: "You must enter your Password",
                },
                minLength: {
                  value: 6,
                  message: "The password must be greater than 6 character",
                },
                maxLength: {
                  value: 12,
                  message: "This is too long",
                },
              })}
            />
            <span className="text-xs text-orange-500 ml-auto">
              {errors?.password?.message}
            </span>
          </div>
          <button
            className="mx-auto block py-2 px-4 bg-gradient-to-r from-[#009ffd] to-[#90d5ec] text-white rounded-lg scale-anim rounded-tr-none"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading.." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
