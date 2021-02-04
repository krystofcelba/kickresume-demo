import React, { useContext } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import API from "../../API";
import { errorToAlertMessage, isAndroid } from "src/utils";
import { useNavigation } from "@react-navigation/native";
import { SnackbarContext } from "src/contexts/SnackBarContext";
import FormSwitchInput from "src/components/forms/inputs/FormSwitchInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormTextInput from "src/components/forms/inputs/FormTextInput";

const RegistrationScreen = ({ componentId }: { componentId: string }) => {
  const navigation = useNavigation();

  const formMethods = useForm();
  const { control, handleSubmit, errors } = formMethods;

  const { setSnack } = useContext(SnackbarContext);

  const onSubmit = async (data) => {
    try {
      console.log("on submit");
      await API.register(data);

      setSnack({
        visible: true,
        message: "Registration was successfull!",
        action: { label: "OK", onPress: () => {} },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", errorToAlertMessage(error));
    }
  };

  console.log(errors);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isAndroid() ? undefined : "padding"}
        keyboardVerticalOffset={isAndroid() ? 25 : 0}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.formContainer}
        >
          <FormProvider {...formMethods}>
            <FormTextInput
              control={control}
              name="email"
              rules={{ required: true }}
              label="Email"
              textContentType={"username"}
            />

            <FormTextInput
              control={control}
              name="password"
              rules={{ required: true }}
              label="Password"
              textContentType={"newPassword"}
              secureTextEntry={true}
            />

            <FormSwitchInput
              control={control}
              name="privacy_confirmation"
              defaultValue={false}
              label="Privacy"
            />

            <FormSwitchInput
              control={control}
              name="marketing_emails_confirmation"
              defaultValue={false}
              label="Marketing"
            />

            <FormSwitchInput
              control={control}
              name="data_sharing_confirmation"
              defaultValue={false}
              label="Data sharing"
            />

            <Button
              title="Submit"
              color="#710ce3"
              onPress={handleSubmit(onSubmit)}
            />
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "whitesmoke",
    padding: 10,
  },
  radioButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    padding: 10,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default RegistrationScreen;
