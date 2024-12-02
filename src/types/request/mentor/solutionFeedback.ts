export type IGetAllSolutionFeedbackParams = {
  page?: string | number;
  per_page?: string | number;
};

export type IFeedbackSolutionRequest = {
  feedback: string;
};

export type IFeedbackSolutionParams = {
  solutionId: string;
};
