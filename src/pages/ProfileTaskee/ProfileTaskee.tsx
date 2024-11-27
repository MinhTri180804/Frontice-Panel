import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import constantRoutesGlobal from "../../constants/routes/global";
import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../service/ChallengeManager/challengeManagerService";
import { Card, Descriptions, Divider, Flex, Table, Typography } from "antd";
import { constantChallengeManagerQueryKey } from "../../constants/queryKey/challengeManager";
import { CardChallengeInformationTaskee } from "./Partials/CardChallengeInformationTaskee";
import { generateItemDescription } from "./ProfileTaskee.util";

const { Title } = Typography;

const ProfileTaskee: FC = () => {
  const { taskeeUsername } = useParams();

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

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách thử thách đã tham gia
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách thử thách chưa hoàn thành
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách thử thách đã hoàn thành
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />
    </Flex>
  );
};

export default ProfileTaskee;
