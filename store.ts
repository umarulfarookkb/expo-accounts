import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./mmkv";

interface Expense {
  id: string;
  description: string;
  amount: number;
  //   date: string;
}

type ExpenseState = {
  expense: Expense[];
  setExpense: (categories: Expense[]) => void;
  getTotalExpense: () => void;
};
export const useExpenseStore = create(
  persist<ExpenseState>(
    (set) => ({
      expense: [],
      setExpense: (newExpense) => set({ expense: newExpense }),
      getTotalExpense: () => {
        return useExpenseStore
          .getState()
          .expense.reduce((sum, expense) => sum + expense.amount, 0);
      },
    }),
    {
      name: "expense",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

interface Category {
  id: string;
  color: string;
  name: string;
}

type CategoriesState = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};
export const useCategoryStore = create(
  persist<CategoriesState>(
    (set) => ({
      categories: [],
      setCategories: (newCategories) => set({ categories: newCategories }),
    }),
    {
      name: "categories-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: "login",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
