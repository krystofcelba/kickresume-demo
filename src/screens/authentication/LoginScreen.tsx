import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import API from "src/API";
import { errorToAlertMessage, isAndroid } from "src/utils";
import { Constants } from "src/assets";
import { useNavigation } from "@react-navigation/native";
import { useAuthDispatch } from "src/contexts/AuthContext";
import FormTextInput from "src/components/forms/inputs/FormTextInput";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAuthDispatch();
  const formMethods = useForm();
  const { control, handleSubmit, errors } = formMethods;

  const onSubmit = async (data) => {
    try {
      console.log("on submit");
      const authToken = await API.login(data);
      await SecureStore.setItemAsync(Constants.authTokenKey, authToken, {});
      API.setAuthHeaders(authToken);
      dispatch({ type: "SET_AUTH_TOKEN", authToken });
    } catch (error) {
      console.log(error);

      Alert.alert("Error!", errorToAlertMessage(error));
    }
  };

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
              name="username"
              rules={{ required: true }}
              label="Email"
              textContentType={"username"}
            />

            <FormTextInput
              control={control}
              name="password"
              rules={{ required: true }}
              label="Password"
              textContentType={"password"}
              secureTextEntry={true}
            />

            <Button
              mode="contained"
              color="#710ce3"
              onPress={handleSubmit(onSubmit)}
            >
              Login
            </Button>
            <Button
              onPress={() => {
                navigation.navigate("RegistrationScreen");
              }}
            >
              Register
            </Button>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // () => Navigation.setRoot(mainRoot)
};

const styles = StyleSheet.create({
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
});

export default LoginScreen;
