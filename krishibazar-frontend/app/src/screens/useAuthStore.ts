import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  email?: string;
  role?: string;
  user?: {
  name: string;
  role: "Buyer" | "Farmer" | "Seller" | "Admin";
};
}

interface AuthState {
  token: string | null;
  decodedToken: CustomJwtPayload | null;
  setToken: (token: string, decodedToken: CustomJwtPayload) => void;
  clearToken: () => void;
  loadToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  decodedToken: null,

  setToken: async (token: string, decodedToken: CustomJwtPayload) => {
    set({ token, decodedToken });
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("decodedToken", JSON.stringify(decodedToken));
  },

  clearToken: async () => {
    set({ token: null, decodedToken: null });
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("decodedToken");
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem("userToken");
    const decodedTokenString = await AsyncStorage.getItem("decodedToken");

    if (token && decodedTokenString) {
      const decodedToken: CustomJwtPayload = JSON.parse(decodedTokenString);
      set({ token, decodedToken });
    }
  },
}));

export default useAuthStore;