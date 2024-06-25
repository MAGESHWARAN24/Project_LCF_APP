import React from "react";
import {Button} from "@/components/ui/button";
import {LuTextCursorInput} from "react-icons/lu";

import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function TextField() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Textbox",
    data: {
      type: "Textbox",
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
        active?.id === "Designer-btn-TextField" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <LuTextCursorInput size={"40"} className="cursor-grab" />
      <p className="text-xs">Textbox</p>
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
    <LuTextCursorInput size={"40"} className="cursor-grab" />
    <p className="text-xs">Textbox</p>
  </Button>
);

export const DesignerElement_TextField = ({properties}) => {
  const {Name, Placeholder, Required, Helpertext} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-3 px-4">
      <Label className="text-md">
        {properties?.Label}{" "}
        {Required && <span className="text-red-500">{"*"}</span>}
      </Label>
      <Input
        readOnly
        name={Name}
        placeholder={Placeholder}
        className="border border-primary"
      />
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
