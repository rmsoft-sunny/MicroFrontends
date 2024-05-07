import { useDebounceValue } from "usehooks-ts";
import { create } from "zustand";

type InfoFormType = {
  id: string;
  nickName: string;
  email: string;
};

type InfoFormAction = {
  action: {
    setId: (value: string) => void;
    setNickName: (value: string) => void;
    setEmail: (value: string) => void;

    reset: () => void;
  };
};

const useInfoFormStore = () => {
  const [nickName, setNickName] = useDebounceValue("", 1000);

  return create<InfoFormType & InfoFormAction>((set) => ({
    id: "",
    nickName,
    email: "",

    action: {
      setId: (value) => set(() => ({ id: value })),
      setNickName: (value) => set(() => ({ nickName: value })),
      setEmail: (value) => set(() => ({ email: value })),
      reset: () =>
        set(() => ({
          id: "",
          nickName: "",
          email: "",
        })),
    },
  }));
};

export const useInfoFormState = () => {
  const infoFormStore = useInfoFormStore();
  const id = infoFormStore((state) => state.id);
  const nickName = infoFormStore((state) => state.nickName);
  const email = infoFormStore((state) => state.email);

  return {
    id,
    nickName,
    email,
  };
};

export const useInfoFormAction = () => {
  const infoFormStore = useInfoFormStore();
  return infoFormStore((state) => state.action);
};
