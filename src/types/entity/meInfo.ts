import { RoleType } from "../base/role";

export type IMeInfo = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullname: string;
  firstLogin: boolean;
  image: string;
  adminRole: RoleType;
  createdAt: number;
};

export type IMentorInfoEntity = IMeInfo;
