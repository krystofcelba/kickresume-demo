import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

function ResumeFormSections() {
  const { control } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "sections",
    }
  );
}

export default ResumeFormSections;
