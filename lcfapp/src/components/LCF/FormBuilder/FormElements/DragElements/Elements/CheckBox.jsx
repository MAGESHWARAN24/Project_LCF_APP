import React from "react";
import {Button} from "@/components/ui/button";
import {IoMdCheckboxOutline} from "react-icons/io";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {IoIosCheckbox} from "react-icons/io";

export default function CheckBox() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Checkbox",
    data: {
      type: "Checkbox",
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
        active?.id === "Designer-btn-Checkbox" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <IoMdCheckboxOutline size={"40"} className="cursor-grab" />
      <p className="text-xs">CheckBox</p>
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
    <IoMdCheckboxOutline size={"40"} className="cursor-grab" />
    <p className="text-xs">CheckBox</p>
  </Button>
);

export const DesignerElement_Checkbox = ({properties}) => {
  const {Name, Required, Placeholder, Helpertext} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-3 px-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <IoIosCheckbox size={"24"} />{" "}
        <Label className="text-md">
          {properties?.Label}
          {Required && <span className="text-red-500">{" *"}</span>}
        </Label>
      </div>
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
