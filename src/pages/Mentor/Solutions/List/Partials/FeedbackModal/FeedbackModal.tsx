import {
  Button,
  Card,
  Collapse,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
} from "antd";
import { FC, useState } from "react";
import { ISolutionFeedbackEntity } from "../../../../../../types/entity/solution";
import {
  itemDescriptionSolution,
  itemsCollapseSolution,
} from "./feedbackModal.logic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mentorService from "../../../../../../service/Mentor/mentorService";
import { mentorQueryKey } from "../../../../../../constants/queryKey/mentor";
import { toast } from "react-toastify";
import { openNewTab } from "../../../../../../utils/helper";

interface IFeedbackModalProps {
  isOpen: boolean;
  solutionData: ISolutionFeedbackEntity;
  onCloseModal: () => void;
}

const FeedbackModal: FC<IFeedbackModalProps> = ({
  isOpen,
  solutionData,
  onCloseModal,
}) => {
  const [feedbackValue, setFeedbackValue] = useState<string>("");
  const itemsDescription = itemDescriptionSolution(solutionData);
  const itemCollapse = itemsCollapseSolution(solutionData.description);
  const queryClient = useQueryClient();
  const mutationFeedback = useMutation({
    mutationKey: ["feedback-solution", solutionData.id],
    mutationFn: async () => {
      return await toast.promise(
        mentorService.solution.feedback(
          { feedback: feedbackValue },
          { solutionId: solutionData.id },
        ),
        {
          pending: "Đang thực hiện đăng tải phản hồi",
          success: "Phàn hồi giải pháp thành công",
          error: "Phản hồi giải pháp thất bại",
        },
      );
    },
    onSuccess: () => {
      onCloseModal();
      setFeedbackValue("");
      queryClient.invalidateQueries({
        queryKey: [mentorQueryKey.solution.getAll],
      });
    },
  });

  const handleOk = () => {
    mutationFeedback.mutate();
  };

  const handleViewSource = () => {
    openNewTab(solutionData.github);
  };

  const handleViewPreview = () => {
    openNewTab(solutionData.liveGithub);
  };

  return (
    <Modal
      width={900}
      open={isOpen}
      title="Phản hồi giải pháp"
      okText="Phàn hồi"
      cancelText="Hủy"
      onCancel={() => onCloseModal()}
      okButtonProps={{
        disabled: feedbackValue === "",
        loading: mutationFeedback.isPending,
      }}
      onOk={handleOk}
    >
      <Flex
        vertical
        gap={16}
        style={{
          margin: "24px 0 44px",
        }}
      >
        <Flex justify="space-between" align="stretch" gap={8}>
          <Button
            variant="outlined"
            size="large"
            style={{ width: "100%" }}
            disabled={!solutionData?.github}
            onClick={handleViewSource}
          >
            Xem mã nguồn
          </Button>
          <Button
            variant="outlined"
            size="large"
            style={{ width: "100%" }}
            disabled={!solutionData?.liveGithub}
            onClick={handleViewPreview}
          >
            Xem kết quả
          </Button>
          <Button variant="outlined" size="large" style={{ width: "100%" }}>
            Xem chi tiết giải pháp
          </Button>
        </Flex>
        <Card>
          <Descriptions
            size="middle"
            items={itemsDescription}
            layout="vertical"
            title="Thông tin giải pháp"
          />
        </Card>

        {Boolean(solutionData.description.length) && (
          <Flex vertical gap={8}>
            <Divider
              style={{ margin: "0", fontSize: "16px" }}
              orientation="left"
            >
              Câu hỏi và trả lời
            </Divider>
            <Collapse items={itemCollapse} size="small" />
          </Flex>
        )}

        <Form>
          <Form.Item
            layout="vertical"
            label="Lời nhận xét của bạn"
            name="feedback"
            rules={[
              { required: true, message: "Lời nhận xét không được để trống" },
            ]}
          >
            <Input
              value={feedbackValue}
              onChange={(e) => setFeedbackValue(e.target.value)}
              placeholder="Nhập lời nhận xét của bạn"
            />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
};

export default FeedbackModal;
