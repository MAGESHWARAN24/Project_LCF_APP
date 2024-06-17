import React from "react";
import {BiSolidBell} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function RightNavBar() {
  return (
    <div className="flex flex-row items-center justify-center gap-5 px-3">
      <ThemeSwitcher />
      <Link to={"/"}>
        <BiSolidBell size={"24"} />
      </Link>
      <Link to={"/"}>
        <FaUserCircle size={"24"} />
      </Link>
    </div>
  );
}
