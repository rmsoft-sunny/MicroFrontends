"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAxios } from "@/hooks/useAxios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const axios = useAxios();

  const onLogout = async () => {
    const response = await axios.post("/api/logout").catch((error) => {
      localStorage.removeItem("access");
      router.replace("/login");
    });
    if (response?.data?.code === 201) {
      localStorage.removeItem("access");
      router.replace("/login");
    } else {
      localStorage.removeItem("access");
      router.replace("/login");
    }
  };

  return (
    <DropdownMenuItem
      className="flex w-full cursor-pointer justify-center font-bold text-slate-500"
      onClick={onLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      로그아웃
    </DropdownMenuItem>
  );
};
