import React, { useRef } from "react";

import { useController } from "react-hook-form";
import { RichEditor } from "react-native-pell-rich-editor";

function FormRichTextInput({
  control,
  name,
  defaultValue,
  rules = {},
  ...otherProps
}) {
  const {
    field: { value, onBlur, onChange },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  const editorRef = useRef(null);

  return (
    <RichEditor
      ref={editorRef}
      initialContentHTML={
        "Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>"
      }
      onChange={onChange}
    />
  );
}

export default FormRichTextInput;
