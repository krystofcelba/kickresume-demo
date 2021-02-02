import React from "react";

import { useController } from "react-hook-form";
import { TextInput } from "react-native-paper";

function FormTextInput({ control, name, defaultValue, rules = {}, ...otherProps }) {
  const {
    field: { value, onBlur, onChange },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <TextInput
      mode="outlined"
      value={value}
      onBlur={onBlur}
      onChangeText={(value) => onChange(value)}
      {...otherProps}
      style={{paddingBottom: 10}}
    />
  );
}

export default FormTextInput;
