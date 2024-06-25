import React from "react";
import {MdOutlinePublish} from "react-icons/md";
import {MdPreview} from "react-icons/md";
import {HiMiniArrowDownOnSquareStack} from "react-icons/hi2";
import {Button} from "@/components/ui/button";

export default function BuilderNav() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Button
        variant="outline"
        className="bg-background hover:bg-primary-foreground text-primary"
      >
        <MdOutlinePublish size={"24"} />
        Publish
      </Button>
      <Button
        variant="outline"
        className="bg-background hover:bg-primary-foreground text-primary"
      >
        <HiMiniArrowDownOnSquareStack size={"24"} />
        Save
      </Button>
      <Button
        variant="outline"
        className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
      >
        <MdPreview size={"24"} />
        Preview
      </Button>
    </div>
  );
}
