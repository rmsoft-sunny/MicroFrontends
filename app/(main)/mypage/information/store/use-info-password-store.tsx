import { create } from "zustand";

type InfoFormType = {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
};

type InfoFormAction = {
  action: {
    setPassword: (value: string) => void;
    setNewPassword: (value: string) => void;
    setNewPasswordCheck: (value: string) => void;

    reset: () => void;
  };
};

const useInfoPasswordFormStore = create<InfoFormType & InfoFormAction>()(
  (set) => ({
    password: "",
    newPassword: "",
    newPasswordCheck: "",

    action: {
      setPassword: (value) => set(() => ({ password: value })),
      setNewPassword: (value) => set(() => ({ newPassword: value })),
      setNewPasswordCheck: (value) => set(() => ({ newPasswordCheck: value })),

      reset: () =>
        set(() => ({
          password: "",
          newPassword: "",
          newPasswordCheck: "",
        })),
    },
  }),
);

export const useInfoPasswordFormState = () => {
  const password = useInfoPasswordFormStore((state) => state.password);
  const newPassword = useInfoPasswordFormStore((state) => state.newPassword);
  const newPasswordCheck = useInfoPasswordFormStore(
    (state) => state.newPasswordCheck,
  );

  return {
    password,
    newPassword,
    newPasswordCheck,
  };
};

export const useInfoPasswordFormAction = () =>
  useInfoPasswordFormStore((state) => state.action);
