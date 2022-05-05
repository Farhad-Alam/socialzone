import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../redux/slices/userSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const token = params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword({ token, password }));
  };
  return (
    <div className="grid place-content-center h-screen">
      {/* Upadte Your Profile Modal */}

      <div className=" bg-[#5F0A87] p-10 font-joseFin text-white">
        <div>
          <h1 className="text-xl font-bold lg:text-3xl text-center mt-5">
            Reset Your Password
          </h1>
          <hr className="border border-black w-[5rem] mx-auto my-4" />
        </div>
        <form onSubmit={handleSubmit} className="md:mt-[5rem]">
          <div className="space-y-10 text-center">
            <div className=" space-y-4">
              <label className="text-lg font-semibold" htmlFor="oldPassword">
                Password :
              </label>
              <input
                placeholder="Enter ur Password"
                className="inputButton text-black"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-green-300 text-sm">
              <Link to="/forgot/password">Request for another Token</Link>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-gradient-to-tr disabled:cursor-not-allowed from-[#380036] to-[#0cbaba] px-4 py-2 rounded-lg text-white text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
