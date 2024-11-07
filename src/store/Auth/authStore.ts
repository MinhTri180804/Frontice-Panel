import { create } from 'zustand';
import { RoleType } from '../../types/base/role';
import { ProfileEntityType } from '../../types/entity/profile';

type State = {
  isAuthentication: boolean;
  profile: ProfileEntityType | null;
  role: RoleType | null;
};

type Action = {
  updateProfile: (profile: ProfileEntityType | null) => void;
  login: (profile: ProfileEntityType) => void;
  logout: () => void;
};

const initialState: State = {
  isAuthentication: false,
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
      isAuthentication: true,
      role: profile.role,
    })),
  logout: () => set(() => initialState),
}));

export default useAuthStore;
