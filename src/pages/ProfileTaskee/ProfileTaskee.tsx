import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import constantRoutesGlobal from "../../constants/routes/global";
import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../service/ChallengeManager/challengeManagerService";
import { Avatar, Card, Descriptions, Flex, Image, Typography } from "antd";
import { constantChallengeManagerQueryKey } from "../../constants/queryKey/challengeManager";
import { CardChallengeInformationTaskee } from "./Partials/CardChallengeInformationTaskee";
import { generateItemDescription } from "./ProfileTaskee.util";
import { TablesChallengeInformation } from "./Partials/TableChallengeInformation";
import useAuthStore from "../../store/Auth/authStore";

const { Title } = Typography;

const ProfileTaskee: FC = () => {
  const { taskeeUsername } = useParams();
  const roleAccount = useAuthStore((state) => state.role);

  const { isFetching, data } = useQuery({
    queryKey: [constantChallengeManagerQueryKey.taskee, taskeeUsername],
    queryFn: async () => {
      if (!taskeeUsername) return;

      const response = await challengeManagerService.taskee.getProfile({
        usernameTaskee: taskeeUsername,
      });

      const responseData = response.data;
      return responseData;
    },
  });

  const itemsDescription = generateItemDescription(data);

  if (!taskeeUsername) {
    return (
      <Navigate to={`/${constantRoutesGlobal.errorPage["404"]}`} replace />
    );
  }

  return (
    <Flex vertical gap={32}>
      <Flex vertical align="center" gap={12}>
        <Title level={4} style={{ margin: 0 }}>
          Ảnh đại diện
        </Title>
        <Image src={data?.image} width={120} style={{ borderRadius: "6px" }} />
      </Flex>
      <Card loading={isFetching}>
        <Descriptions
          title="Thông tin"
          items={itemsDescription}
          size="default"
        />
      </Card>
      <Flex gap={12}>
        <CardChallengeInformationTaskee
          isLoading={isFetching}
          title="Thử thách tham gia"
          value={data?.challengeJoined || 0}
        />
        <CardChallengeInformationTaskee
          isLoading={isFetching}
          title="Thử thách đang thực hiện"
          value={data?.pendingChallenges || 0}
        />
        <CardChallengeInformationTaskee
          isLoading={isFetching}
          title="Thử thách hoàn thành"
          value={data?.submittedChallenges || 0}
        />
      </Flex>

      {roleAccount !== "mentor" && roleAccount !== "tasker" && (
        <TablesChallengeInformation />
      )}
    </Flex>
  );
};

export default ProfileTaskee;
