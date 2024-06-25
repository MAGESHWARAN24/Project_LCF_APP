import {RxDropdownMenu} from "react-icons/rx";
import React from "react";
import {Button} from "@/components/ui/button";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";

export default function SelectField() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Select",
    data: {
      type: "Select",
      dragItem: <DraggedElement />,
      properties: {
        Name: "Name",
        Label: "Label",
        Placeholder: "Placeholder",
        Required: true,
        SelectType: "static",
        Options: [{value: "option"}],
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
        active?.id === "Designer-btn-Select" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <RxDropdownMenu size={"40"} className="cursor-grab" />
      <p className="text-xs">Select</p>
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
    <RxDropdownMenu size={"40"} className="cursor-grab" />
    <p className="text-xs">Select</p>
  </Button>
);

export const DesignerElement_Select = ({properties}) => {
  const {Name, Placeholder, Required, Helpertext, Options} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-3 px-4">
      <Label className="text-md">
        {properties?.Label}{" "}
        {Required && <span className="text-red-500">{"*"}</span>}
      </Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={Placeholder} />
        </SelectTrigger>
      </Select>
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
