import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

export const storage = new MMKV({
  id: "mmkv-storage",
});

export const zustandStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value);
  },
  getItem: (name: string) => {
    return storage.getString(name);
  },
  removeItem: (name: string) => {
    return storage.delete(name);
  },
};
