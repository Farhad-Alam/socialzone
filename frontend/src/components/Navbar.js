import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { GrSearch } from "react-icons/gr";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { showAtom } from "../atoms/showProfile";
import { useRecoilState } from "recoil";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [tab, setTab] = useState(window.location.pathname);
  const [shows, setShows] = useRecoilState(showAtom);

  return (
    <nav className="nav">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4 lg:px-10">
        {/* Left */}
        <div>
          <div className="text-xl hidden sm:block md:text-2xl font-joseFin">
            ShareGram
          </div>
        </div>
        {/* Center */}
        <div className="">
          <ul className="flex space-x-8 sm:space-x-16">
            <li onClick={() => setTab("/")} className="scale-anim relative">
              <Link to="/" className={tab === "/" && "line"}>
                <AiFillHome size={25} />
              </Link>
            </li>
            <li
              onClick={() => setTab("/createpost")}
              className="scale-anim relative"
            >
              <Link
                to="/createpost"
                className={tab === "/createpost" && "line"}
              >
                <HiPlus size={25} />
              </Link>
            </li>
            <li
              onClick={() => setTab("/userposts")}
              className="scale-anim relative"
            >
              <Link to="/userposts" className={tab === "/userposts" && "line"}>
                <MdOutlineAccountCircle size={25} />
              </Link>
            </li>
          </ul>
        </div>
        {/* Right */}

        <div
          onClick={() => setShows(!shows)}
          className="flex items-center cursor-pointer space-x-2 sm:space-x-4 bg-gray-200 px-4 rounded-3xl"
        >
          <h1 className="text-xs font-semibold py-3">{user?.name}</h1>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={user?.avatar.url}
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
