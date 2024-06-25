import React from "react";
import H1 from "./Elements/H1";
import TextField from "./Elements/TextField";
import TextArea from "./Elements/TextArea";
import CheckBox from "./Elements/CheckBox";
import Radio from "./Elements/Radio";
import SelectField from "./Elements/Select";
import DatePicker from "./Elements/DatePicker";
import Attachment from "./Elements/Attachment ";
import Number from "./Elements/Number";
import RichTextEditor from "./Elements/RichTextEditor";

export default function DragArea() {
  return (
    <main className="grid xl:grid-cols-2 grid-cols-1 place-items-center place-content-center gap-2">
      <H1 />
      <TextField />
      <TextArea />
      <CheckBox />
      <Radio />
      <SelectField />
      <DatePicker />
      <Attachment />
      <Number />
      <RichTextEditor />
    </main>
  );
}
