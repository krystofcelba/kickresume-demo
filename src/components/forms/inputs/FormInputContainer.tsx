import React from "react";
import { View } from "react-native";
import { Div } from "react-native-magnus";

function FormInputContainer({ children }) {
  return (
    <Div pb="md">
      <View>{children}</View>
    </Div>
  );
}

export default FormInputContainer;
