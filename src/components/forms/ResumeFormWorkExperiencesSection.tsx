import React, { useCallback } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Collapse, Div, Icon, Input, Text } from "react-native-magnus";
import { Button, TextInput } from "react-native-paper";
import FormRichTextInput from "./inputs/FormRichTextInput";
import FormTextInput from "./inputs/FormTextInput";

const NAME = "workExperiences";

const NEW_EXPERIENCE_DATA = {
  city: "",
  note: null,
  company: "",
  country: "",
  current: true,
  endDate: ["01", ""],
  jobTitle: "",
  startDate: ["01", "2018"],
  description: "",
  presentValue: "",
  defaultActive: true,
};

function ResumeFormWorkExperiencesSection() {
  const { control, watch } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: NAME,
    }
  );

  const onAddButtonClicked = useCallback(() => {
    append(NEW_EXPERIENCE_DATA, true);
  }, [append]);

  return (
    <Div bg="yellow100" p={"sm"} rounded={5}>
      {fields.map((item, index) => (
        <Collapse key={item.id} defaultActive={item.defaultActive}>
          <Collapse.Header
            active
            color="white"
            bg="blue500"
            fontSize="xl"
            p="xl"
            px="none"
            pl="xl"
            prefix={
              <Icon
                name="briefcase-outline"
                mr="md"
                color="white"
                fontSize="xl"
                fontFamily="MaterialCommunityIcons"
              />
            }
          >
            {watch(`${NAME}[${index}].company`)}
          </Collapse.Header>
          <Collapse.Body bg="orange200" py={30}>
            <FormTextInput
              label="Company"
              control={control}
              name={`${NAME}[${index}].company`}
              defaultValue={item.company}
            />
            <FormTextInput
              label="Job title"
              control={control}
              name={`${NAME}[${index}].jobTitle`}
              defaultValue={item.jobTitle}
            />
            <FormTextInput
              label="City"
              control={control}
              name={`${NAME}[${index}].city`}
              defaultValue={item.city}
            />
            <FormTextInput
              label="Country"
              control={control}
              name={`${NAME}[${index}].country`}
              defaultValue={item.country}
            />

            <FormRichTextInput
              control={control}
              name={`${NAME}[${index}].description`}
              defaultValue={item.description}
            />
            <Div pt="xl">
              <Button
                icon="delete"
                color="#e53e3e"
                mode="contained"
                onPress={() => remove(index)}
              >
                Delete
              </Button>
            </Div>
          </Collapse.Body>
        </Collapse>
      ))}
      <Div pt="md">
        <Button
          icon="plus"
          mode="outlined"
          color="#2f855a"
          onPress={onAddButtonClicked}
        >
          Add work experience
        </Button>
      </Div>
    </Div>
  );
}

export default ResumeFormWorkExperiencesSection;
