import React from "react";
import {useDroppable} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {DesignerElement_H1} from "../DragElements/Elements/H1";
import {DesignerElement_TextField} from "../DragElements/Elements/TextField";
import {IoMdTrash} from "react-icons/io";
import {Button} from "@/components/ui/button";
import {DeleteElement} from "@/Redux/Slices/Builder.Sclice";
import {useDispatch} from "react-redux";
import {useDesginer} from "@/Hooks/DesignerProvider";
import {DesignerElement_TextArea} from "../DragElements/Elements/TextArea";
import {DesignerElement_Select} from "../DragElements/Elements/Select";
import {DesignerElement_Radio} from "../DragElements/Elements/Radio";
import {DesignerElement_Checkbox} from "../DragElements/Elements/CheckBox";
import {DesignerElement_Datepicker} from "../DragElements/Elements/DatePicker";
import {DesignerElement_Number} from "../DragElements/Elements/Number";
import {DesignerElement_Attachment} from "../DragElements/Elements/Attachment ";

export default function DesignerElement({props}) {
  const {id, type, properties} = props;
  const [isMouseOver, setIsMouseOver] = React.useState(null);
  const dispath = useDispatch();
  const {setNodeRef, attributes, listeners, transform, transition} =
    useSortable({
      id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const {SetToggle} = useDesginer();
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="h-32 w-full flex items-center justify-center shadow-sm shadow-primary rounded-xl relative"
    >
      <Element type={type} properties={properties} />
      {isMouseOver && (
        <div className="h-full w-full flex items-center justify-between  bg-transparent backdrop-blur-[1px] rounded-xl absolute">
          <p
            className="h-full flex font-bold items-center justify-center text-center w-full blur-none animate-pulse"
            onClick={() =>
              SetToggle({
                id: id,
                state: true,
              })
            }
          >
            Click for property or drag to move
          </p>
          <Button
            variant="destructive"
            className="h-full w-fit rounded-l-none rounded-tr-xl rounded-br-xl z-10"
            onClick={() => {
              dispath(DeleteElement(id));
            }}
          >
            <IoMdTrash size={"24"} />
          </Button>
        </div>
      )}
    </div>
  );
}

const Element = ({type, properties}) => {
  switch (type) {
    case "Heading":
      return <DesignerElement_H1 properties={properties} />;
    case "Textbox":
      return <DesignerElement_TextField properties={properties} />;
    case "Textarea":
      return <DesignerElement_TextArea properties={properties} />;
    case "Select":
      return <DesignerElement_Select properties={properties} />;
    case "Radio":
      return <DesignerElement_Radio properties={properties} />;
    case "Checkbox":
      return <DesignerElement_Checkbox properties={properties} />;
    case "Datepicker":
      return <DesignerElement_Datepicker properties={properties} />;
    case "Number":
      return <DesignerElement_Number properties={properties} />;
    case "Attachment":
      return <DesignerElement_Attachment properties={properties} />;
    default:
      return null;
  }
};
