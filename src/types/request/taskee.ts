export type IGetAllTaskeeInChallengeParams = {
  query: "submitted" | "unsubmitted" | "all";
  challengeId: string;
  page: number;
  perPage: number;
};