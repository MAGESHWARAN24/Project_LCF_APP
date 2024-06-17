import React from "react";
import {TbApps} from "react-icons/tb";
import {Button} from "@/components/ui/button";
export default function CreateBtn() {
  return (
    <>
      <Button
        variant={"outline"}
        className="group border border-primary/20 h-40 items-center justify-center flex flex-col hover:border-primary hover:cursor border-dashed gap-4"
      >
        <TbApps className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
        <p className="font-bold text-lg text-muted-foreground group-hover:text-primary">
          Create new application
        </p>
      </Button>
    </>
  );
}
