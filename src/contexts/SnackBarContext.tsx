import React, { createContext, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";

export const SnackbarContext = createContext({});

export function SnackbarProvider(props) {
  const [snack, setSnack] = useState<{
    message: string;
    visible: boolean;
    action:
      | {
          label: string;
          accessibilityLabel?: string | undefined;
          onPress: () => void;
        }
      | undefined;
  }>({
    message: "",
    visible: false,
    action: undefined,
  });

  const onDismissSnackBar = () =>
    setSnack({ message: "", visible: false, action: undefined });

  return (
    <SnackbarContext.Provider value={{ setSnack }}>
      <Portal>
        <Snackbar
          visible={snack.visible}
          onDismiss={onDismissSnackBar}
          action={snack.action}
        >
          Hey there! I'm a Snackbar.
        </Snackbar>
      </Portal>
      {props.children}
    </SnackbarContext.Provider>
  );
}
