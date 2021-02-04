import React, { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  Button,
  Dialog,
  List,
  Portal,
  Switch,
  useTheme,
} from "react-native-paper";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import FormInputContainer from "./FormInputContainer";

function transformFromMomentToArray(date: moment.Moment) {
  return [`${date.month()}`, `${date.year()}`];
}

function transformFromArrayToMoment(array?: [string, string]) {
  if (array) {
    return moment()
      .month(+array[0])
      .year(+array[1]);
  } else {
    return moment();
  }
}

function FormMonthPickerInput({
  control,
  name,
  defaultValue,
  label,
  icon,
  rules = {},
  present = false,
  ...otherProps
}) {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  const { watch, trigger, errors, setValue } = useFormContext();
  const error = errors?.[name];

  const {
    field: { value, onBlur, onChange },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  useEffect(() => {
    trigger(name);
  }, [watch(name)]);

  const selectedDate = transformFromArrayToMoment(watch(name));

  return (
    <FormInputContainer>
      <Button
        icon={icon}
        mode="outlined"
        onPress={() => setVisible(true)}
        contentStyle={{ justifyContent: "flex-start" }}
        disabled={present}
      >
        {`${
          !present ? `${label}: ${selectedDate.format("MMMM YYYY")}` : "Present"
        }`}
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <MonthPicker
              initialView={transformFromArrayToMoment(
                watch(name) || defaultValue
              )}
              selectedDate={selectedDate}
              onMonthChange={(value) =>
                setValue(name, transformFromMomentToArray(value))
              }
            />
            <Button mode="outlined" onPress={hideDialog}>
              OK
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </FormInputContainer>
  );
}

export default FormMonthPickerInput;
