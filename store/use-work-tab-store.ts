import { create } from "zustand";
import { persist } from "zustand/middleware";

type TabStateType = "in-progress" | "supportable" | "closed";

interface WorkTabStoreStateType {
  workTab: TabStateType;
  actions: {
    setWorkTab: (tabState: TabStateType) => void;
  };
}

const useWorkTabStore = create<WorkTabStoreStateType>()(
  persist(
    (set) => ({
      workTab: "in-progress",
      actions: {
        setWorkTab: (tabState) => set((state) => ({ workTab: tabState })),
      },
    }),
    {
      name: "work-tab-state",
      partialize: (state) => ({ workTab: state.workTab }),
    },
  ),
);

export const useWorkTab = () => useWorkTabStore((state) => state.workTab);
export const useWorkTabActions = () =>
  useWorkTabStore((state) => state.actions);
