"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postSignup = async (submitData: any) => {
  const response = await axios.post("/api/client/auth/join", submitData);

  return response;
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: postSignup,
  });
};
