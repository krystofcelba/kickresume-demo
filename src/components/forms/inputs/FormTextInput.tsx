import React from "react";
import { StyleSheet } from "react-native";
import { useController } from "react-hook-form";
import { TextInput } from "react-native-paper";
import FormInputContainer from "./FormInputContainer";

function FormTextInput({
  control,
  name,
  defaultValue = "",
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

  return (
    <FormInputContainer>
      <TextInput
        mode="outlined"
        value={value}
        onBlur={onBlur}
        onChangeText={(value) => onChange(value)}
        {...otherProps}
      />
    </FormInputContainer>
  );
}

export default FormTextInput;
