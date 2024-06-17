import React from "react";
import CreateBtn from "./CreateBtn";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
      <CreateBtn />
      <ApplicationCard />
    </div>
  );
}
