export type IRefreshTokenRequest = {
  refreshToken: string;
};

export type IUpdateProfileRequest = {
  username?: string;
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  cv?: string;
  image?: string;
};

export type IUpdateProfileMentorRequest = {
  username?: string;
  email?: string;
  fullname?: string;
  image?: string;
};

export type IRemoveFileRequest = {
  path: string[];
};

export type IChangePasswordRequest = {
  current_password: string;
  password: string;
  password_confirmation: string;
};
