import React from "react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

export default function AuthMiddleware({children}) {
  const location = useLocation();
  const token = localStorage.getItem("_auth_jwt");
  const navigate = useNavigate();
  console.log();
  React.useEffect(() => {
    if (!token && !location.pathname.split("/").length !== 0) {
      // navigate("/");
      console.log(location);
    }
  }, [location.pathname]);
  return <>{children}</>;
}
