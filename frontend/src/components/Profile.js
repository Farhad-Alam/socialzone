import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ avatar, name, userId }) => {
  return (
    <div className="shadow-lg p-2">
      <Link
        to={`/user/${userId}`}
        className="p-2 md:p-4 flex items-center space-x-2 md:space-x-4 border-b last:border-none scale-anim"
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={avatar}
          alt=""
        />
        <h1 className="text-sm font-semibold">{name}</h1>
      </Link>
    </div>
  );
};

export default Profile;
