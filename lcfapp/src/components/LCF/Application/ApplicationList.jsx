import React from "react";
import CreateBtn from "./CreateBtn";
import ApplicationCard from "./ApplicationCard";
import {useDispatch, useSelector} from "react-redux";
import {applicationGetAll} from "@/Redux/Slices/Application.Slice";

export default function ApplicationList() {
  const {applications} = useSelector((state) => state.Application);
  const dispatch = useDispatch();
  React.useEffect(() => {
    localStorage.removeItem("ApplicationInfo");
    dispatch(applicationGetAll());
  }, []);
  return (
    <div className="h-fit w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 p-10">
      <CreateBtn />
      {applications.length !== 0 &&
        applications.map((item, i) => (
          <ApplicationCard key={item?.id} index={i} props={item} />
        ))}
    </div>
  );
}
