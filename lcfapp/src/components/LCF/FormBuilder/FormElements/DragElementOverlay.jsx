import {DragOverlay, useDndMonitor} from "@dnd-kit/core";
import React from "react";

export default function DragElementOverlay() {
  const [draggedItem, setDraggedItem] = React.useState();
  useDndMonitor({
    onDragStart: (event) => {
      if (event.active?.data?.current?.dragItem)
        setDraggedItem(event.active?.data?.current?.dragItem);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  return <DragOverlay>{draggedItem}</DragOverlay>;
}
