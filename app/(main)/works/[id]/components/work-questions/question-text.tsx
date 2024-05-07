import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

const QuestionText = ({
  form,
  question,
  name,
  required = false,
}: {
  form: UseFormReturn<any>;
  question: string;
  required: boolean;
  name: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={`${name}.answer`}
      render={({ field }) => (
        <FormItem>
          <div>
            <p className="my-4 font-semibold">
              {question}
              {required && <span className="text-destructive">*</span>}
            </p>
            <Textarea
              className="h-12 resize-none"
              name={name}
              value={field.value || ""}
              onChange={(e) => {
                form.setValue(`${name}.answer`, e.target.value);
                if (e.target.value.length) {
                  form.clearErrors(`${name}.answer`);
                }
              }}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default QuestionText;
