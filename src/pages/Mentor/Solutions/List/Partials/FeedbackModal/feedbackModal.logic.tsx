import { DescriptionsProps } from "antd";
import { ISolutionFeedbackEntity } from "../../../../../../types/entity/solution";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";

const itemDescriptionSolution: (
  solution: ISolutionFeedbackEntity,
) => DescriptionsProps["items"] = (solution) => {
  return [
    {
      key: "title",
      label: "tiêu đều",
      children: solution.title,
    },
    {
      key: "liked",
      label: "Luợt yêu thích",
      children: solution.liked,
    },
    {
      key: "disliked",
      label: "Luợt không yêu thích",
      children: solution.disliked,
    },
    {
      key: "submittedAt",
      label: "Thời gian nộp",
      children: convertTimestampToVietnamTime(solution.submitedAt),
    },
  ];
};

export default itemDescriptionSolution;
