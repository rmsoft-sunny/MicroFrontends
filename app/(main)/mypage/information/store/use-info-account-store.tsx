import { create } from "zustand";

type InfoAccountFormType = {
  bank: string[];
  accountPerson: string;
  accountNumber: string;
};

type InfoAccountFormAction = {
  action: {
    setBank: (value: string) => void;
    setAccountPerson: (value: string) => void;
    setAccountNumber: (value: string) => void;

    reset: () => void;
  };
};

const useInfoAccountFormStore = create<
  InfoAccountFormType & InfoAccountFormAction
>()((set) => ({
  bank: [],
  accountPerson: "",
  accountNumber: "",

  action: {
    setBank: (value) =>
      set((state) => ({ bank: Array.from(new Set([...state.bank, value])) })),
    setAccountPerson: (value) => set(() => ({ accountPerson: value })),
    setAccountNumber: (value) => set(() => ({ accountNumber: value })),

    reset: () =>
      set(() => ({
        bank: [],
        accountPerson: "",
        accountNumber: "",
      })),
  },
}));

export const useInfoAccountFormState = () => {
  const bank = useInfoAccountFormStore((state) => state.bank);
  const accountPerson = useInfoAccountFormStore((state) => state.accountPerson);
  const accountNumber = useInfoAccountFormStore((state) => state.accountNumber);

  return {
    bank,
    accountPerson,
    accountNumber,
  };
};

export const useInfoAccountFormAction = () =>
  useInfoAccountFormStore((state) => state.action);
