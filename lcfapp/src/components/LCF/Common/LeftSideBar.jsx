import React from "react";
import {MdDynamicForm} from "react-icons/md";
import {FaUsers} from "react-icons/fa6";
import {FaUserGear} from "react-icons/fa6";
import {BsFillMenuButtonWideFill} from "react-icons/bs";
import {IoIosGitNetwork} from "react-icons/io";
import {NavLink, useParams} from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area";

const defaultMenuItems = [
  {icon: <FaUsers size={"24"} />, label: "Users", path: "/users"},
  {icon: <FaUserGear size={"24"} />, label: "Roles", path: "/roles"},
  {
    icon: <BsFillMenuButtonWideFill size={"24"} />,
    label: "Menu",
    path: "/menu",
  },
  {
    icon: <MdDynamicForm size={"24"} />,
    label: "Form Builder",
    path: "/formbuilder",
  },
  {icon: <IoIosGitNetwork size={"24"} />, label: "Workflow", path: "/workflow"},
];

export default function LeftSideBar() {
  const [menuItem, setMenuItem] = React.useState([]);
  const {applicationid} = useParams();
  return (
    <ScrollArea className="h-[98%] w-full py-2">
      <div className="flex flex-col gap-5">
        {defaultMenuItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center"
          >
            <NavLink
              to={`/applicationlist/${applicationid}${item.path}`}
              className="size-14 shadow-sm shadow-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-background active:text-background"
            >
              {item.icon}
            </NavLink>
            <div className="text-center">{item.label}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
