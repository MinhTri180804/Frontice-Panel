import { IChallengeEntity } from "./challenge";
import { ITaskEntity } from "./task";

export type ISolutionEntity = {
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
  mentor_feedback: string | null;
};

export type ITaskSolutionEntity = {
  id: string;
  taskee: {
    username: string;
    firstname: string;
    lastname: string;
    image: string;
    gold_account: boolean;
    url: string;
  };
  task: Omit<
    ITaskEntity,
    | "shortDes"
    | "joinTotal"
    | "submittedTotal"
    | "expiredAt"
    | "created_at"
    | "updated_at"
  >;
  title: string;
  github: string;
  liveGithub: string;
  submittedAt: number;
  status: string;
};
