import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loginAtom } from "../atoms/logInAtom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { forgotAtom } from "../atoms/forgotAtom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [forgot, setForgot] = useRecoilState(forgotAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [logIn, setLogIn] = useRecoilState(loginAtom);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = async (values) => {
    try {
      await dispatch(authLogin(values));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
          Not a Member?
          <span
            onClick={() => setLogIn(!logIn)}
            className="text-lime-400 font-semibold ml-2 border-b scale-anim inline-block cursor-pointer border-lime-400 py-1"
          >
            Sign Up
          </span>
        </p>
      </div>
      {/* Right */}
      <div className="font-joseFin bg-white p-16">
        <h1 className="text-3xl font-semibold mb-4 text-center">Sign In</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col space-y-2">
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
          <span
            onClick={() => setForgot(!forgot)}
            className="text-sm mt-4 block text-right cursor-pointer scale-anim text-green-500"
          >
            Forgot Your Password !!
          </span>
          <button
            className="mx-auto block py-2 px-4 bg-gradient-to-r from-[#009ffd] to-[#90d5ec] text-white rounded-lg scale-anim rounded-tr-none"
            disabled={loading}
          >
            {loading ? "Loading.." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
