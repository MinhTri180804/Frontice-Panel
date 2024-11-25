export type IGetAllSolutionParams = {
  per_page?: string | number;
  page?: string | number;
};

export type IGetDetailsSolutionParams = {
  solutionId: string;
};

export type IGetAllByChallengeIdParams = {
  challengeId: string;
};
