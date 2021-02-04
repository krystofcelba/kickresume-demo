import React, { useRef } from "react";

import { useController } from "react-hook-form";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

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

  const editorInitializedCallback = () => {
    editorRef.current.registerToolbar(() => {});
  };

  return (
    <>
      <RichEditor
        ref={editorRef}
        initialContentHTML={defaultValue}
        onChange={onChange}
        editorInitializedCallback={() => {}}
      />
      <RichToolbar getEditor={() => editorRef.current} />
    </>
  );
}

export default FormRichTextInput;
