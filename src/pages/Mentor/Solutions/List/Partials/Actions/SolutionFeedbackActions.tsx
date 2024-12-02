import { Button, Flex } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesMentor from "../../../../../../constants/routes/mentor";
import { FeedbackModal } from "../FeedbackModal";
import { ISolutionFeedbackEntity } from "../../../../../../types/entity/solution";

interface ISolutionFeedbackActionsProps {
  solutionData: ISolutionFeedbackEntity;
}

const SolutionFeedbackActions: FC<ISolutionFeedbackActionsProps> = ({
  solutionData,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleViewDetails = () => {
    return navigate(
      `${constantRoutesMentor.solution.details}/${solutionData.id}`,
    );
  };

  const handleFeedback = () => {
    setIsOpenModal(true);
  };

  const handleCloseFeedback = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Flex justify="start" align="stretch" gap={8}>
        <Button
          variant="outlined"
          color="primary"
          size="middle"
          onClick={handleFeedback}
        >
          Phản hồi
        </Button>
        <Button
          variant="solid"
          color="primary"
          size="middle"
          onClick={() => handleViewDetails}
        >
          Xem chi tiết
        </Button>
      </Flex>
      <FeedbackModal
        solutionData={solutionData}
        isOpen={isOpenModal}
        onCloseModal={handleCloseFeedback}
      />
    </>
  );
};

export default SolutionFeedbackActions;
