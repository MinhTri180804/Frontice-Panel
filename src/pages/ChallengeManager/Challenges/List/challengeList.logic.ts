import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IGetAllChallengeParams,
  IRemoveChallengeParams,
} from "../../../../types/request/challenge";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { toast } from "react-toastify";

interface IUseChallengeListLogicPrams {
  queryChallengeListParams?: IGetAllChallengeParams;
}

const DEFAULT_PARAMS_QUERY_CHALLENGE_LIST = {};

const useChallengeListLogic = ({
  queryChallengeListParams,
}: IUseChallengeListLogicPrams) => {
  const queryClient = useQueryClient();
  const queryChallengeList = useQuery({
    queryKey: [
      "challenge_list",
      queryChallengeListParams?.page || 1,
      queryChallengeListParams?.sort || "newest",
      queryChallengeListParams?.perPage || 10,
    ],
    queryFn: async () => {
      console.log("fetch");
      const response = await challengeManagerService.challenge.getAll(
        queryChallengeListParams || DEFAULT_PARAMS_QUERY_CHALLENGE_LIST,
      );

      return response.data;
    },
  });

  const mutationRemove = useMutation({
    mutationKey: [],
    mutationFn: (params: IRemoveChallengeParams) =>
      challengeManagerService.challenge.remove(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenge_list"],
      });
      toast.success("Xóa thử thách thành công");
    },
    onError: () => {
      toast.error("Xóa thử thách thất bại");
    },
  });

  return {
    queryChallengeList,
    mutationRemove,
  };
};

export default useChallengeListLogic;
