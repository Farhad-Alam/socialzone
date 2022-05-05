import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { forgotAtom } from "../atoms/forgotAtom";
import { loginAtom } from "../atoms/logInAtom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/slices/userSlice";

const Auth = () => {
  const [logIn] = useRecoilState(loginAtom);
  const [email, setEmail] = useState("");
  const [forgot, setForgot] = useRecoilState(forgotAtom);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
  };
  return (
    <div>
      <div className="flex justify-center items-center sm:h-screen">
        {logIn ? <LoginForm /> : <SignUpForm />}
      </div>
      <Dialog open={forgot} onClose={() => setForgot(!forgot)}>
        <div className="p-10 font-joseFin">
          <h1 className="text-center text-xl mb-8">Forgot Your Password</h1>
          <form
            onSubmit={handleSubmit}
            className="flex bg-gray-200 rounded-full mb-10"
          >
            <input
              type="text"
              className="outline-none bg-gray-200 w-full px-4 rounded-full"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-lime-300 p-2 rounded-r-full">
              Submit
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Auth;
