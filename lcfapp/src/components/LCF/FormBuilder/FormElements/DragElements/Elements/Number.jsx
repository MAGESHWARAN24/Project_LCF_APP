import React from "react";
import {Button} from "@/components/ui/button";
import {Bs123} from "react-icons/bs";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";

export default function Number() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Number",
    data: {
      type: "Number",
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
        active?.id === "Designer-btn-Number" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Bs123 size={"40"} className="cursor-grab" />
      <p className="text-xs">Number</p>
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
    <Bs123 size={"40"} className="cursor-grab" />
    <p className="text-xs">Number</p>
  </Button>
);

export const DesignerElement_Number = ({properties}) => {
  const {Name, Placeholder, Required, Label, Helpertext} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-3 px-4">
      <Label className="text-md">
        {Label} {Required && <span className="text-red-500">{"*"}</span>}
      </Label>
      <Input
        type="number"
        readOnly
        name={Name}
        placeholder={Placeholder}
        className="border border-primary"
      />
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
