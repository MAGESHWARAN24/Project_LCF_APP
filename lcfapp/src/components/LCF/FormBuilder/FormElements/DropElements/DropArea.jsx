import {cn} from "@/lib/utils";
import {
  closestCenter,
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import {useSelector} from "react-redux";
import DesignerElement from "./DesignerElement";
export default function DropArea() {
  const {setNodeRef, isOver} = useDroppable({
    id: "DropArea",
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 100,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const {content} = useSelector((state) => state.Builder);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToWindowEdges]}
      autoScroll={true}
    >
      <main
        className={cn(
          "h-[85%] w-[85%] shadow-sm shadow-primary border bg-background px-5 py-4 overflow-y-auto",
          isOver && "ring-2 ring-primary"
        )}
        ref={setNodeRef}
      >
        {!content.length && (
          <section className="size-full flex items-center justify-center text-4xl font-bold text-primary relative">
            {!isOver && <>Drop here</>}
            {isOver && !content.length && (
              <div className="absolute top-0 w-full h-32 dark:bg-primary-foreground bg-primary rounded-xl"></div>
            )}
          </section>
        )}
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={(event) => console.log(event)}
        >
          <SortableContext
            items={content}
            strategy={verticalListSortingStrategy}
          >
            <>
              {content.map((items) => (
                <DesignerElement key={items?.id} props={items} />
              ))}
            </>
          </SortableContext>
        </DndContext>
      </main>
    </DndContext>
  );
}
