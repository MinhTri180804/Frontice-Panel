export type IGetAllChallengeParams = {
  sort?: string;
  page?: string | number;
  perPage?: string | number;
};

export type IRemoveChallengeParams = {
  challengeId: string;
};

export type IGetDetailsChallengeParams = {
  challengeId: string;
};

export type ICreateChallengeRequest = {
  title: string;
  level_id: string;
  point: number;
  desc: string;
  short_des: string;
  technical: string[];
  image: string;
  source: string;
  figma: string;
  premium: boolean;
};

export type IDeleteFileChallengeRequest = {
  path: string[];
};
