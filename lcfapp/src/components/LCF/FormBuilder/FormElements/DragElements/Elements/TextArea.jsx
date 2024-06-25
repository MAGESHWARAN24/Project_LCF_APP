import React from "react";
import {Button} from "@/components/ui/button";
import {BsTextareaResize} from "react-icons/bs";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function TextArea() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Textarea",
    data: {
      type: "Textarea",
      dragItem: <DraggedElement />,
      properties: {
        Name: "Name",
        Placeholder: "Placeholder",
        Label: "Label",
        Required: true,
        Helpertext: "Helpertext",
        Min: 0,
        Max: 0,
        ForeignKey: true,
        ShowInGrid: true,
      },
    },
  });
  return (
    <Button
      variant="outline"
      className={cn(
        active?.id === "Designer-btn-Textarea" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <BsTextareaResize size={"40"} className="cursor-grab" />
      <p className="text-xs">TextArea</p>
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
    <BsTextareaResize size={"40"} className="cursor-grab" />
    <p className="text-xs">TextArea</p>
  </Button>
);

export const DesignerElement_TextArea = ({properties}) => {
  const {Name, Placeholder, Required, Helpertext} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-2 px-4">
      <Label className="text-md">
        {properties?.Label}{" "}
        {Required && <span className="text-red-500">{"*"}</span>}
      </Label>
      <Textarea
        readOnly
        name={Name}
        placeholder={Placeholder}
        className="border border-primary"
      />
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
