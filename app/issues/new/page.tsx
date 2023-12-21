"use client";
import { Button, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title"></TextFieldInput>
      </TextFieldRoot>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
