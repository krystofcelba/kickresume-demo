import React, { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { List, Switch, useTheme } from "react-native-paper";

function FormSwitchInput({
  control,
  name,
  defaultValue,
  label,
  rules = {},
  ...otherProps
}) {
  const { colors } = useTheme();

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

  return (
    <List.Item
      title={label}
      right={(innerProps) => (
        <Switch
          value={watch(name)}
          {...otherProps}
          color={error ? colors.error : colors.primary}
          onValueChange={(value) => setValue(name, value)}
        />
      )}
    ></List.Item>
  );
}

export default FormSwitchInput;
