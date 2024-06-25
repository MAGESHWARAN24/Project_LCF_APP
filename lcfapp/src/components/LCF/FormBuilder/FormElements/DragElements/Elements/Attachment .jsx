import React from "react";
import {Button} from "@/components/ui/button";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {IoAttach} from "react-icons/io5";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function Attachment() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Attachment",
    data: {
      type: "Attachment",
      dragItem: <DraggedElement />,
      properties: {
        Name: "Name",
        Label: "Label",
        Required: true,
        Helpertext: "Helpertext",
        ForeignKey: true,
        ShowInGrid: true,
      },
    },
  });
  return (
    <Button
      variant="outline"
      className={cn(
        active?.id === "Designer-btn-Attachment" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <IoAttach size={"40"} className="cursor-grab" />
      <p className="text-xs">Attachment</p>
    </Button>
  );
}

const DraggedElement = () => (
  <Button
    variant="outline"
    className={cn(
      "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
    )}
  >
    <IoAttach size={"40"} className="cursor-grab" />
    <p className="text-xs">Attachment</p>
  </Button>
);

export const DesignerElement_Attachment = ({properties}) => {
  const {Name, Placeholder, Required, Helpertext} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start text-primary justify-center gap-3 px-4">
      <Label className="text-md">
        {properties?.Label}{" "}
        {Required && <span className="text-red-500">{"*"}</span>}
      </Label>
      <Input
        type="file"
        readOnly
        name={Name}
        placeholder={Placeholder}
        className="border border-primary text-primary"
      />
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
