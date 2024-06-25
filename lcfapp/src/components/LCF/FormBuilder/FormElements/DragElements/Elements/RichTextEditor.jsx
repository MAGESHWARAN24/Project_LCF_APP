import {LuClipboardEdit} from "react-icons/lu";
import React from "react";
import {Button} from "@/components/ui/button";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";

export default function RichTextEditor() {
  const {setNodeRef, attributes, listeners, active} = useDraggable({
    id: "Designer-Element-RichTextEditor",
    data: {
      type: "Rich text editor",
      dragItem: <DraggedElement />,
    },
  });
  return (
    <Button
      variant="outline"
      className={cn(
        active?.id === "Designer-btn-RichTextEditor" &&
          "ring-primary ring-1 bg-primary-foreground",
        "size-32 flex flex-col items-center justify-center cursor-grab shadow-sm shadow-primary dark:shadow-background"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <LuClipboardEdit size={"40"} className="cursor-grab" />
      <p className="text-xs">Rich text editor</p>
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
    <LuClipboardEdit size={"40"} className="cursor-grab" />
    <p className="text-xs">Rich text editor</p>
  </Button>
);
