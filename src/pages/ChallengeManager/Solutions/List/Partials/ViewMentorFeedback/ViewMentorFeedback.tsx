import {
  CheckOutlined,
  CloseOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { Button, Flex, Modal, Typography } from "antd";
import { FC, useState } from "react";

interface IViewMentorFeedbackProps {
  mentorFeedback: string | null;
}

const { Title, Text } = Typography;

const ViewMentorFeedback: FC<IViewMentorFeedbackProps> = ({
  mentorFeedback,
}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  if (!mentorFeedback) {
    return (
      <Flex justify="center" align="center">
        <Button
          disabled
          icon={<CloseOutlined />}
          color="danger"
          variant="solid"
        ></Button>
      </Flex>
    );
  }
  return (
    <>
      <Flex justify="center" align="center">
        <Button
          color="primary"
          variant="solid"
          icon={<CheckOutlined />}
          onClick={() => setIsShowModal(true)}
        ></Button>
      </Flex>
      <Modal
        title={"Phản hồi của Mentor"}
        open={isShowModal && Boolean(mentorFeedback)}
        footer={() => (
          <Button
            variant="solid"
            size="middle"
            onClick={() => setIsShowModal(false)}
          >
            Hủy
          </Button>
        )}
        onCancel={() => setIsShowModal(false)}
      >
        <Text>{mentorFeedback}</Text>
      </Modal>
    </>
  );
};

export default ViewMentorFeedback;
