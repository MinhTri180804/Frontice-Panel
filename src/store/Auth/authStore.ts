import { create } from "zustand";
import { IMeInfo, IMentorInfoEntity } from "../../types/entity/meInfo";
import { RoleType } from "../../types/base/role";
import {
  removeAccessToken,
  removeRefreshToken,
} from "../../utils/localstorage";

type State = {
  isAuthenticated: boolean;
  profile: IMeInfo | IMentorInfoEntity | null;
  role: RoleType | null;
  isPending: boolean;
};

type Action = {
  updateProfile: (profile: IMeInfo | IMentorInfoEntity | null) => void;
  login: (profile: IMeInfo) => void;
  logout: () => void;
  setIsPending: (value: boolean) => void;
};

const initialState: State = {
  isAuthenticated: false,
  profile: null,
  role: null,
  isPending: true,
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
      role: profile?.adminRole || profile.role,
    })),
  logout: () => {
    removeAccessToken();
    removeRefreshToken();
    set(() => ({ ...initialState, isPending: false }));
  },
  setIsPending: (value) => set(() => ({ isPending: value })),
}));

export default useAuthStore;
