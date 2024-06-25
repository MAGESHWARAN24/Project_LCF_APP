import React from "react";
import {Button} from "@/components/ui/button";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Label} from "@/components/ui/label";

export default function DatePicker() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Datepicker",
    data: {
      type: "Datepicker",
      dragItem: <DraggedElement />,
      properties: {
        Name: "Name",
        Label: "Label",
        Placeholder: "Placeholder",
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
        active?.id === "Designer-btn-Datepicker" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <IoCalendarNumberOutline size={"40"} className="cursor-grab" />
      <p className="text-xs">DatePicker</p>
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
    <IoCalendarNumberOutline size={"40"} className="cursor-grab" />
    <p className="text-xs">DatePicker</p>
  </Button>
);

export const DesignerElement_Datepicker = ({properties}) => {
  const {Name, Required, Helpertext, Placeholder} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-3 px-4">
      <Label className="text-md">
        {properties?.Label}
        {Required && <span className="text-red-500">{" *"}</span>}
      </Label>
      <div className="flex flex-row w-full border border-primary h-10 rounded-lg items-center justify-between gap-2 px-5">
        {Placeholder}
        <CalendarIcon className="size-5" />{" "}
      </div>
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
