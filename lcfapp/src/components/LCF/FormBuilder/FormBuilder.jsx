import React from "react";
import CreateBtn from "./CreateBtn";
import FormCard from "./FormCard";

export default function FormBuilder() {
  return (
    <div className="h-[92%] w-full m-5">
      <div className="lg:h-fit md:h-fit h-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 overflow-y-auto py-1">
        <CreateBtn />
        <FormCard />
      </div>
    </div>
  );
}
