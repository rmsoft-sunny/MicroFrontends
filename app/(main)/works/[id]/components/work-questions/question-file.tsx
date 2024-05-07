"use client";
import React, { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { usePostFileUpload } from "../../services/post-file-upload";

import { ImageIcon, Loader2, X } from "lucide-react";

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

const QuestionFile = ({
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<null | string>(null);

  const { mutate, isPending } = usePostFileUpload();

  const handleFileUpload = () => {
    if (!fileRef.current?.files) return;
    const file = fileRef.current.files[0];

    if (file.size > FILE_SIZE_LIMIT) {
      form.setError(`${name}.filename`, {
        message: "파일 용량은 최대 5MB 입니다.",
      });
      fileRef.current.value == "";
      return;
    }

    if (file.name.length > 85) {
      form.setError(`${name}.filename`, {
        message: "파일명은 최대 85자 입니다.",
      });
      fileRef.current.value == "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    mutate(formData, {
      onSuccess: (res) => {
        if (!fileRef.current?.files) return;
        switch (res.code) {
          case 100:
            setFilename(res.data.originalFilename);
            form.setValue(name, {
              filename: res.data.originalFilename,
              fileUrl: res.data.fileUrl,
            });
            form.clearErrors(name);
            break;
        }
        fileRef.current.value = "";
      },
    });
  };

  const handleFileRemove = () => {
    setFilename(null);
    form.resetField(name, {
      defaultValue: { filename: undefined },
    });
  };

  return (
    <FormField
      control={form.control}
      name={`${name}.filename`}
      render={({ field }) => (
        <FormItem>
          <p className="my-4 font-semibold">
            {question}
            {required && <span className="text-destructive">*</span>}
          </p>
          <div>
            <Label
              htmlFor={name}
              className={`${buttonVariants({ variant: "outline" })} cursor-pointer`}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              첨부하기
            </Label>
            <FormMessage className="mt-1" />
            <p className="text-xs leading-loose text-foreground/90">
              5MB 미만의 파일만 업로드 가능합니다.
            </p>
            {filename && (
              <div className="my-4 flex items-center gap-2 rounded-md border border-primary bg-primary/10 p-2 text-zinc-700 ">
                <ImageIcon className="h-5 w-5" />
                <div className="grow">{filename}</div>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={handleFileRemove}
                >
                  {<X className="h-5 w-5" />}
                </Button>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              id={name}
              name={name}
              onChange={handleFileUpload}
              className="hidden"
              disabled={isPending}
            />
          </div>
        </FormItem>
      )}
    />
  );
};

export default QuestionFile;
