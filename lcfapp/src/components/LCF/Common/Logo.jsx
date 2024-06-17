import React from "react";
import {BsFillGrid3X3GapFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import ApplicationTitle from "../Application/ApplicationTitle";
export default function Logo() {
  return (
    <div className="flex items-center flex-row gap-5">
      <Link to={"/applicationlist"} className="ml-2">
        <BsFillGrid3X3GapFill size={"24"} />
      </Link>
      <ApplicationTitle />
    </div>
  );
}
