import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { isAndroid } from "src/utils";
import ResumeFormWorkExperiencesSection from "src/components/forms/ResumeFormWorkExperiencesSection";
import initialData from "src/assets/resume-data.json";
import { ScrollView } from "react-native-gesture-handler";

function EditResumeFormScreen() {
  const workExperiences = initialData.cv.sections[0].data.entries;
  const methods = useForm({
    defaultValues: { workExperiences },
  });
  const { watch } = methods;

  console.log(watch());

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isAndroid() ? undefined : "padding"}
        keyboardVerticalOffset={isAndroid() ? 25 : 0}
      >
        <FormProvider {...methods}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.formContainer}
          >
            <ResumeFormWorkExperiencesSection />
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
