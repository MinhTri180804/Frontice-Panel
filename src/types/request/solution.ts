import { IChallengeEntity } from "../entity/challenge";

export type IGetAllSolutionParams = {
  per_page?: string | number;
  page?: string | number;
};

export type IGetAllSolutionResponse = {
  solutions: {
    id: string;
    taskee: {
      username: string;
      firstname: string;
      lastname: string;
      image: string;
      gold_account: boolean;
      url: string;
    };
    challenge: Omit<IChallengeEntity, "owner">;
    title: string;
    github: string;
    liveGithub: string;
    liked: number;
    disliked: number;
    description: {
      title: string;
      answer: string;
    }[];
    submitedAt: number;
    comment: number;
    mentor_feedback: null;
  }[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
