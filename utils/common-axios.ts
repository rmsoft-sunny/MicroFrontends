import axios from "axios";

export const tokenAxios = (urlName?: "ADMIN" | "CLIENT" | "PROJECT") => {
  let baseURL = "";

  switch (urlName) {
    case "ADMIN":
      baseURL = process.env.ADMIN!;
      break;
    case "CLIENT":
      baseURL = process.env.CLIENT!;
      break;
    case "PROJECT":
      baseURL = process.env.PROJECT!;
      break;
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access") : null;

  const tokenAxios = axios.create({
    headers: { Authorization: token },
  });

  return tokenAxios;
};
