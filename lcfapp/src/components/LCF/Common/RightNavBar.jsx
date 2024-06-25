import React from "react";
import {BiSolidBell} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import {IoSettingsSharp} from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {RiBuilding2Fill} from "react-icons/ri";
import {FaUserPlus} from "react-icons/fa6";
import {IoSettingsOutline} from "react-icons/io5";

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoSettingsSharp size={"24"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center gap-3">
            <RiBuilding2Fill size={"24"} /> Organization
          </DropdownMenuItem>
          <Link to={"/user"}>
            <DropdownMenuItem className="flex items-center gap-3">
              <FaUserPlus size={"24"} /> User
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3">
            <IoSettingsOutline size={"24"} /> Configuration
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
