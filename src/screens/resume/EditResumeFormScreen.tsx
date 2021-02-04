import React from "react";
import { StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useForm, FormProvider } from "react-hook-form";

import { ScrollView } from "react-native-gesture-handler";

import { isAndroid } from "src/utils";
import { Div } from "react-native-magnus";
import { Button } from "react-native-paper";
import useSagaReducer from "use-saga-reducer";

import ResumeFormWorkExperiencesSection from "src/components/forms/ResumeFormWorkExperiencesSection";

import initialData from "src/assets/resume-data.json";
import { reducer, saga } from "./EditResumeFormScreen.reducer";

function EditResumeFormScreen() {
  const workExperiences = initialData.cv.sections[0].data.entries;
  const formMethods = useForm({
    defaultValues: { workExperiences },
  });
  const { watch, handleSubmit } = formMethods;

  const [state, dispatch] = useSagaReducer(saga, reducer, {
    submitting: false,
    submissionStateMessage: "",
  });

  const { submitting, submissionStateMessage } = state;

  console.log(watch());

  const onSubmit = (data) => {
    dispatch({ type: "SUBMIT", data });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isAndroid() ? undefined : "padding"}
        keyboardVerticalOffset={isAndroid() ? 25 : 100}
      >
        <FormProvider {...formMethods}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.formContainer}
          >
            <ResumeFormWorkExperiencesSection />

            <Div pt="md">
              <Button
                icon="application-export"
                mode="contained"
                color="#2f855a"
                loading={submitting}
                onPress={handleSubmit(onSubmit)}
              >
                {submitting ? submissionStateMessage : "Submit"}
              </Button>
            </Div>
          </ScrollView>
        </FormProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  input: {
    marginBottom: 10,
  },
});

export default EditResumeFormScreen;
