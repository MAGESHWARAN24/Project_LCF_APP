import React, {act} from "react";
import BuilderNav from "./BuilderNav";
import {DndContext} from "@dnd-kit/core";
import DropArea from "./FormElements/DropElements/DropArea";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";
import DragArea from "./FormElements/DragElements/DragArea";
import DragElementOverlay from "./FormElements/DragElementOverlay";
import {useDispatch} from "react-redux";
import {AddElement} from "@/Redux/Slices/Builder.Sclice";
import {nanoid} from "nanoid";
import {useDesginer} from "@/Hooks/DesignerProvider";
import ElementCustomizer from "./FormElements/DragElements/ElementCustomizer";
import {ScrollArea} from "@/components/ui/scroll-area";
export default function Builder() {
  const dispath = useDispatch();
  const {toggle} = useDesginer();
  return (
    <>
      <div className="h-full w-full">
        <nav className="h-12 shadow-md border-b flex items-center px-2 justify-between">
          <div className="truncate font-bold text-lg">
            Form : {`${"Form Name"}`}
          </div>
          <BuilderNav />
        </nav>
        <main className="h-[94%] w-full flex flex-row justify-between">
          <DndContext
            autoScroll={true}
            modifiers={[restrictToWindowEdges]}
            onDragEnd={(event) => {
              const {active, over} = event;
              if (!active || !over) return null;
              if (
                active?.id.includes("Designer-Element-") &&
                over?.id.includes("DropArea")
              ) {
                const {type, properties} = active?.data?.current;
                const id = nanoid();
                console.log(event);
                dispath(AddElement({id, type, properties}));
              }
            }}
          >
            <section className="w-full h-full flex items-center justify-center bg-[url('./assets/Bg-Builder-light.svg')] dark:bg-[url('./assets/Bg-Builder-dark.svg')]">
              <DropArea />
            </section>
            {toggle?.state ? (
              <ScrollArea className="h-full w-2/6">
                <aside className="h-full w-full bg-background overflow-hidden">
                  <ElementCustomizer />
                </aside>
              </ScrollArea>
            ) : (
              <aside className="w-2/6 h-full border border-l-primary overflow-x-hidden overflow-y-auto px-3 py-3">
                <DragArea />
              </aside>
            )}
            <DragElementOverlay />
          </DndContext>
        </main>
      </div>
    </>
  );
}
