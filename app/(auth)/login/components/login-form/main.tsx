"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { HTMLAttributes, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  userId: z.string().min(2, {
    message: "필수값입니다.",
  }),
  password: z.string().min(2, {
    message: "필수값입니다.",
  }),
});

export const LoginForm = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage("access", "");
  const [session, setSession] = useLocalStorage("user", "", {
    serializer: (value) => JSON.stringify(value),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios
        .post("/api/login", {
          id: data.userId,
          pwd: data.password,
        })
        .catch((error) => {
          switch (error.response.data.code) {
            case 857:
            case 820:
              toast.error("아이디를 찾을 수 없습니다.", {
                position: "top-center",
                duration: 1500,
              });
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              break;
            case 850:
              toast.error("비밀번호가 올바르지 않습니다.", {
                position: "top-center",
                duration: 1500,
              });
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              break;
            case 824:
            case 825:
              toast.error("로그인이 제한된 계정입니다.", {
                position: "top-center",
                duration: 1500,
              });
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              break;
            default:
              toast.error("로그인에 실패했습니다.", {
                position: "top-center",
                duration: 1500,
              });
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              break;
          }
        });
      if (response?.data.code === 202) {
        setToken(response.headers.authorization);
        setSession(response.data.data);

        setTimeout(() => {
          setIsLoading(false);
          router.replace("/change-password");
        }, 1000);
      }

      // Success
      if (response?.data.code === 200) {
        setToken(response.headers.authorization);
        setSession(response.data.data);

        setTimeout(() => {
          setIsLoading(false);
          router.replace("/works");
        }, 1000);
      }
    } catch (error) {
      toast.error("로그인에 실패했습니다.", {
        position: "top-center",
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid">
              <FormField
                name="userId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        placeholder="아이디를 입력해주세요."
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="h-12 w-[400px] p-4 text-slate-500 focus:text-zinc-800"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative grid">
                    {eyeOpen ? (
                      <Eye
                        className="absolute right-4 top-[22px] h-5 w-5 cursor-pointer text-slate-400 hover:text-primary"
                        onClick={() => setEyeOpen(false)}
                      />
                    ) : (
                      <EyeOff
                        className="absolute right-4 top-[22px] h-5 w-5 cursor-pointer text-slate-400 hover:text-primary"
                        onClick={() => setEyeOpen(true)}
                      />
                    )}

                    <Input
                      placeholder="비밀번호를 입력해주세요."
                      type={eyeOpen ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="h-12 w-[400px] py-4 pl-4 pr-11 text-slate-500 focus:text-zinc-800"
                      {...field}
                    />
                  </FormItem>
                )}
              />

              <div className="mb-4 mt-1 flex w-full justify-end">
                <Link href="/find-info">
                  <Button
                    variant="link"
                    className="p-0 text-sm font-bold text-slate-600/70"
                    type="button"
                  >
                    아이디/비밀번호 찾기
                  </Button>
                </Link>
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                size="lg"
                className="bg-blue-500 hover:bg-blue-400"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="text-base font-bold">로그인</span>
              </Button>
            </div>

            <Button
              variant="outline"
              disabled={isLoading}
              size="lg"
              className="mr-2 mt-3 w-full p-0 text-base font-bold text-slate-500 hover:text-slate-600"
              asChild
            >
              <Link href="/sign-up" prefetch>
                회원 가입
              </Link>
            </Button>
          </form>
        </Form>
        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
