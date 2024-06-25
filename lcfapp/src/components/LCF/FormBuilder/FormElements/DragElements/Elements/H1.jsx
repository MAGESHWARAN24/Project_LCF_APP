import React from "react";
import {Button} from "@/components/ui/button";
import {LuHeading1} from "react-icons/lu";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";

export default function H1() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-Heading1",
    data: {
      type: "Heading",
      dragItem: <DraggedElement />,
      properties: {Title: "Heading-1"},
    },
  });
  return (
    <Button
      variant="outline"
      className={cn(
        active?.id === "Designer-btn-Heading1" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <LuHeading1 size={"40"} className="cursor-grab" />
      <p className="text-xs">Heading</p>
    </Button>
  );
}

const DraggedElement = () => (
  <Button
    variant="outline"
    className={cn(
      "size-32 flex flex-col items-center justify-center cursor-grab dark:shadow-background shadow-primary"
    )}
  >
    <LuHeading1 size={"40"} className="cursor-grab" />
    <p className="text-xs">Heading</p>
  </Button>
);

export const DesignerElement_H1 = ({properties}) => {
  const {Title} = properties;
  return (
    <section className="w-full h-32 text-2xl flex flex-col items-center justify-center">
      <LuHeading1 />
      {Title}
    </section>
  );
};
