import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { BsCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { postCreate } from "../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const imageRef = useRef();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [comment, setComment] = useState("");
  const { loading } = useSelector((state) => state.post);

  const handleImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readEvent) => {
      setSelectedFile(readEvent.target.result);
    };
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        return toast.error("Please fill all the field");
      }
      await dispatch(postCreate({ selectedFile, comment }));
      setSelectedFile(null);
      setComment("");
      history("/userposts");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-auto ">
      <Navbar />
      <div className="flex justify-center items-center h-[80vh] p-4 font-joseFin">
        <div className="border-2 mt-[5rem] space-y-4 md:space-y-8 bg-white w-[30rem] p-10 shadow-xl">
          <h1 className="text-2xl text-center">Create Post</h1>
          {selectedFile && (
            <div className="">
              <img
                className="w-full h-[17rem] object-contain drop"
                src={selectedFile}
                alt=""
              />
            </div>
          )}
          <form onSubmit={handlePostSubmit} className="flex flex-col space-y-6">
            <div className="text-center">
              <div
                onClick={() => {
                  imageRef.current.click();
                }}
                className="p-2 text-center scale-anim bg-gray-200 drop inline-block rounded-full"
              >
                <BsCameraFill size={30} className="text-green-400" />
              </div>
            </div>
            <input
              hidden
              ref={imageRef}
              type="file"
              onChange={handleImg}
              className="outline-none border-b border-gray-400 "
            />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter ur Caption..."
              className="outline-none border-b border-gray-400 px-4 py-2"
            />
            <div className="inline-block mx-auto">
              <button
                disabled={!comment}
                className="bg-gradient-to-tr disabled:cursor-not-allowed scale-anim px-6 py-2 rounded-tr-2xl rounded-bl-2xl from-[#3eadcf] to-[#abe9cd]"
                type="submit"
              >
                {loading ? "Loading.." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
