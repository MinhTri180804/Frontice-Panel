import { create } from "zustand";
import { IMeInfo } from "../../types/entity/meInfo";
import { RoleType } from "../../types/base/role";

type State = {
  isAuthenticated: boolean;
  profile: IMeInfo | null;
  role: RoleType | null;
};

type Action = {
  updateProfile: (profile: IMeInfo | null) => void;
  login: (profile: IMeInfo) => void;
  logout: () => void;
};

const initialState: State = {
  isAuthenticated: false,
  profile: null,
  role: null,
};

const useAuthStore = create<State & Action>((set) => ({
  ...initialState,
  updateProfile: (newProfile) =>
    set(() => ({
      profile: newProfile,
    })),
  login: (profile) =>
    set(() => ({
      profile: profile,
      isAuthenticated: true,
      role: profile.adminRole,
    })),
  logout: () => set(() => initialState),
}));

export default useAuthStore;
