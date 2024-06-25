import React from "react";
import {Button} from "@/components/ui/button";
import {CgRadioChecked} from "react-icons/cg";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

export default function Radio() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Radio",
    data: {
      type: "Radio",
      dragItem: <DraggedElement />,
      properties: {
        Name: "Name",
        Label: "Label",
        Required: true,
        Helpertext: "Helpertext",
        Options: [{value: "option"}],
        ForeignKey: true,
        ShowInGrid: true,
      },
    },
  });
  return (
    <Button
      variant="outline"
      className={cn(
        active?.id === "Designer-btn-Radio" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CgRadioChecked size={"40"} className="cursor-grab" />
      <p className="text-xs">Radio</p>
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
    <CgRadioChecked size={"40"} className="cursor-grab" />
    <p className="text-xs">Radio</p>
  </Button>
);

export const DesignerElement_Radio = ({properties}) => {
  const {Name, Required, Helpertext, Options} = properties;
  return (
    <div className="w-full h-full flex flex-col items-start justify-center gap-3 px-4">
      <Label className="text-md">
        {properties?.Label}{" "}
        {Required && <span className="text-red-500">{"*"}</span>}
      </Label>
      <RadioGroup>
        <div className="flex flex-row items-center justify-center gap-2">
          <RadioGroupItem /> <Label className="text-xl">options</Label>
        </div>
      </RadioGroup>
      <p className="truncate text-xs">{Helpertext}</p>
    </div>
  );
};
