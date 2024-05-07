"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ChangePasswordForm } from "./form";

export const ChangePasswordComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token] = useLocalStorage("access", "");

  useEffect(() => {
    if (token === "") {
      router.replace("/login");
    }
  }, [token, router]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading === true) return;
  if (token === "") return;

  return (
    <>
      <div className="w-[440px] rounded-lg bg-white p-10">
        <ChangePasswordForm />
      </div>
    </>
  );
};
