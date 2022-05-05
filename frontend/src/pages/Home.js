import React from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <Navbar />
      <Posts />
    </div>
  );
};

export default Home;
