import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button, Collapse, Div, Icon, Input, Text } from "react-native-magnus";
import { TextInput } from "react-native-paper";
import FormRichTextInput from "./inputs/FormRichTextInput";
import FormTextInput from "./inputs/FormTextInput";

const NAME = "workExperiences";

function ResumeFormWorkExperiencesSection() {
  const { control, watch } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: NAME,
    }
  );

  return (
    <Div>
      {fields.map((item, index) => (
        <Collapse key={item.id}>
          <Collapse.Header
            active
            color="gray900"
            bg="blue500"
            fontSize="md"
            p="xl"
            px="none"
            pl="xl"
            prefix={<Icon name="wallet" mr="md" color="gray400" />}
          >
            {watch(`${NAME}[${index}].company`)}
          </Collapse.Header>
          <Collapse.Body bg="orange100" py={30}>
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

            <Div h={20} />
          </Collapse.Body>
        </Collapse>
      ))}
    </Div>
  );
}

export default ResumeFormWorkExperiencesSection;
