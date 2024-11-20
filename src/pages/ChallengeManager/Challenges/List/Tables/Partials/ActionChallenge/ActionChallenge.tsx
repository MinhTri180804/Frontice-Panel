import {
  Button,
  ButtonProps,
  Card,
  Checkbox,
  CheckboxProps,
  Flex,
  Modal,
  Space,
  Statistic,
  Typography,
} from "antd";
import { IChallengeEntity } from "../../../../../../../types/entity/challenge";
import constantRoutesChallengeManager from "../../../../../../../constants/routes/challengeManager";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import challengeManagerService from "../../../../../../../service/ChallengeManager/challengeManagerService";
import { logOnDev } from "../../../../../../../utils/helper";
import { toast } from "react-toastify";
import { constantChallengeManagerQueryKey } from "../../../../../../../constants/queryKey/challengeManager";

interface IActionChallengeProps {
  challenge: IChallengeEntity;
}

const ActionChallenge: FC<IActionChallengeProps> = ({ challenge }) => {
  const navigate = useNavigate();
  const { confirm } = Modal;
  const queryClient = useQueryClient();
  useState<boolean>(false);
  const mutationRemoveChallenge = useMutation({
    mutationKey: ["remove_challenge"],
    mutationFn: async () => {
      return challengeManagerService.challenge.remove({
        challengeId: challenge.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          constantChallengeManagerQueryKey.challenge.myChallenges,
          constantChallengeManagerQueryKey.challenge.allChallenges,
        ],
      });
      logOnDev(`[REMOVE CHALLENGE] success || challenge: ${challenge.id}`);
    },
    onError: () =>
      logOnDev(`[REMOVE CHALLENGE] error || challenge: ${challenge.id}`),
  });

  const showConfirmRemove = () => {
    let knowRemoveChecked = false;
    let knowChallengePremiumChecked = false;

    const handleKnowRemoveChecked: CheckboxProps["onChange"] = (e) => {
      knowRemoveChecked = e.target.checked;
      updateOkButtonState();
    };

    const handleKnowChallengePremiumChecked: CheckboxProps["onChange"] = (
      e,
    ) => {
      knowChallengePremiumChecked = e.target.checked;
      updateOkButtonState();
    };

    const handleOkRemoveChallenge = () => {
      const modal = document.querySelector(".ant-modal-confirm");
      const okButton = modal?.querySelector(".ant-btn-primary");

      const loadingClass = "ant-btn-loading";

      okButton?.classList.add(loadingClass);
      return toast.promise(
        mutationRemoveChallenge.mutateAsync().then(() => {
          okButton?.classList.remove(loadingClass);
        }),
        {
          pending: "Đang thực hiện xóa thử thách",
          success: "Xóa thử thách thành công",
          error: "Xóa thử thách thất bại",
        },
      );
    };

    confirm({
      width: 620,
      title: "Xác nhận xóa thử thách",
      content: (
        <Flex vertical gap={24} justify="start" align="stretch">
          <Flex justify="space-between" align="stretch" gap={24}>
            <Card bordered style={{ flex: 1 }}>
              <Statistic
                title="Số lượng người tham gia"
                value={challenge.joinTotal}
              />
            </Card>
            <Card bordered style={{ flex: 1 }}>
              <Statistic
                title="Số lượng người hoàn thành"
                value={challenge.submittedTotal}
              />
            </Card>
          </Flex>
          <Flex vertical gap={12} justify="start" align="stretch">
            {challenge.premium && (
              <Typography color="#FFB82E">Đây là thử thách Premium</Typography>
            )}

            <Checkbox
              onChange={handleKnowRemoveChecked}
              value={knowRemoveChecked}
            >
              Tôi xác nhận xóa thử thách
            </Checkbox>
            {challenge.premium && (
              <Checkbox
                onChange={handleKnowChallengePremiumChecked}
                value={knowChallengePremiumChecked}
              >
                Tôi biết đó là thử thách premium
              </Checkbox>
            )}
          </Flex>
        </Flex>
      ),
      okText: "Xác nhận",
      onOk: handleOkRemoveChallenge,
      cancelText: "Hủy bỏ",
    });

    function updateOkButtonState() {
      const modal = document.querySelector(".ant-modal-confirm");
      const okButton = modal?.querySelector(
        ".ant-btn-primary",
      ) as HTMLButtonElement;

      if (okButton) {
        okButton.disabled = !(
          knowRemoveChecked &&
          (!challenge.premium || knowChallengePremiumChecked)
        );
      }
    }
  };

  return (
    <>
      <Flex gap={12} justify="start" align="center">
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `${constantRoutesChallengeManager.pages.challenges.details}/:${challenge.id}`,
            )
          }
        >
          Xem chi tiết
        </Button>
        <Button
          variant="outlined"
          color="danger"
          onClick={() => showConfirmRemove()}
        >
          Xóa
        </Button>
      </Flex>
    </>
  );
};

export default ActionChallenge;
