import { RoleType } from "@/enums/enum-list";
import { useLocalStorage } from "usehooks-ts";

interface UserType {
  id: string;
  nickname: string;
  roleType: keyof typeof RoleType;
}

export const useUser = () => {
  const [user] = useLocalStorage("user", "", {
    deserializer: (value) => JSON.parse(value),
  });

  if (user === "") return null;

  return user as UserType;
};
