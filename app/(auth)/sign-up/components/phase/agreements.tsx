"use client";

import _ from "lodash";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PolicyModal } from "../modal/policy-modal";
import { AgreeModal } from "../modal/agree-modal";

interface AgreementProps {
  setIsAgreeCheck: Dispatch<SetStateAction<string[]>>;
}

const items = [
  {
    id: "privacyUsageAgreement",
    label: "이용 약관 동의",
    required: true,
  },
  {
    id: "providePersonalInformation",
    label: "개인 정보 처리 방침",
    required: true,
  },
] as const;

const CHECK_ALL = [
  "privacyUsageAgreement",
  "providePersonalInformation",
  "marketingAgreement",
];

const FormSchema = z.object({
  items: z.array(z.string()).refine(
    (value) => {
      const checkAgree = _.includes(value, "privacyUsageAgreement");
      const checkInfo = _.includes(value, "providePersonalInformation");

      if (checkAgree && checkInfo) {
        return true;
      } else {
        return false;
      }
    },
    {
      message: "필수항목을 선택해주세요",
    },
  ),
});

export const UserAgreement = ({ setIsAgreeCheck }: AgreementProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsAgreeCheck(data.items);
  };

  return (
    <>
      <div className="flex flex-col justify-center rounded-md p-2">
        <header className="my-4 flex w-full flex-col justify-center p-2">
          <h2 className="flex justify-center text-lg font-bold">
            약관에 동의해주세요.
          </h2>
          <p className="flex justify-center text-sm text-slate-500">
            원활한 이용을 위해 약관 동의가 필요합니다.
          </p>
        </header>
        <Separator className="mb-7" />
        <Card className="mb-2 w-full rounded-md">
          <div className="flex h-[40px] items-center p-4">
            <Checkbox
              className="mr-2"
              id="check-all"
              checked={_.isEqual(form.watch("items"), CHECK_ALL)}
              onCheckedChange={(value) => {
                if (value) {
                  form.clearErrors();
                  form.setValue("items", CHECK_ALL);
                } else {
                  form.reset();
                }
              }}
            />
            <Label htmlFor="check-all" className="cursor-pointer">
              전체 동의
            </Label>
          </div>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="rounded-md p-4">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem className="space-y-4">
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex items-center justify-between space-y-0"
                            >
                              <div className="flex items-center">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    "ml-2 flex text-sm font-normal",
                                  )}
                                >
                                  {item.label}
                                  <span
                                    className={cn(
                                      "ml-1",
                                      item.required && "font-bold text-red-400",
                                    )}
                                  >
                                    {item.required ? "(필수)" : "(선택)"}
                                  </span>
                                </FormLabel>
                              </div>
                              <Dialog key={item.id}>
                                <DialogTrigger className="flex cursor-pointer text-sm underline">
                                  보기
                                </DialogTrigger>
                                <DialogContent
                                  onOpenAutoFocus={(event) =>
                                    event.preventDefault()
                                  }
                                >
                                  <ScrollArea className="mt-2 h-[30rem]">
                                    {item.id ===
                                    "providePersonalInformation" ? (
                                      <PolicyModal />
                                    ) : (
                                      <AgreeModal />
                                    )}
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </Card>
            <Separator className="mt-8" />
            <Button
              type="submit"
              disabled={!!form.formState.errors.items}
              className="mt-6 w-full bg-blue-500 text-base font-bold hover:bg-blue-400"
            >
              다음으로
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
