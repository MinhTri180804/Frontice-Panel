import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { Avatar, Card, Divider, Flex, Typography } from "antd";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import ChallengerTable from "../List/Tables/Partials/ChallengerTable/ChallengerTable";
import { scrollToElement } from "../../../../utils/helper";
import { ChallengeOverview } from "../../../../components/Components/ChallengeOverview";
import { IChallengeEntity } from "../../../../types/entity/challenge";

const ChallengeDetailsPage: FC = () => {
  const { Text } = Typography;
  const { challengeId } = useParams();
  console.log("challengeId: ", challengeId);
  const { data, isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.challenge.detailsChallenge,
      challengeId,
    ],
    queryFn: async () => {
      const response = await challengeManagerService.challenge.getDetails({
        challengeId: challengeId as string,
      });
      const responseData = response.data;
      return responseData;
    },
  });

  const defautlAvatar =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <Flex vertical justify="start" align="stretch" gap={32}>
      <ChallengeOverview
        isLoading={isFetching}
        challengeData={data as IChallengeEntity}
      />

      <Flex justify="center" align="center" gap={24}>
        <Card
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => scrollToElement("table__taskee__joined")}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Số người tham gia
            </Text>

            <Text style={{ fontSize: "20px" }}>{data?.joinTotal}</Text>
          </Flex>
        </Card>
        <Card loading={isFetching} style={{ width: "100%", cursor: "pointer" }}>
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Người đăng tải
            </Text>

            <Flex justify="center" align="center" gap={12} vertical>
              <Avatar src={data?.owner.image || defautlAvatar} size={"large"} />
              <Flex vertical justify="center" align="center">
                <Text>{data?.owner.fullname}</Text>
                <Text style={{ fontSize: "14px", color: "grey" }}>
                  {data?.owner.email}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card
          loading={isFetching}
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => scrollToElement("table__taskee__unsubmitted")}
        >
          <Flex vertical justify="center" align="center" gap={12}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Số người Hoàn thành
            </Text>

            <Text style={{ fontSize: "20px" }}>{data?.submittedTotal}</Text>
          </Flex>
        </Card>
      </Flex>

      <Divider orientation="left" plain>
        Danh sách <span style={{ fontWeight: "bold" }}>Taskee đã tham gia</span>
      </Divider>

      <ChallengerTable
        idTable="table__taskee__joined"
        challengeId={challengeId as string}
        typeChallengerInChallenge="all"
      />

      <Divider orientation="left" plain>
        Danh sách{" "}
        <span style={{ color: "#5250F7" }}>Taskee chưa hoàn thành</span>
      </Divider>

      <ChallengerTable
        challengeId={challengeId as string}
        typeChallengerInChallenge="submitted"
      />

      <Divider orientation="left" plain>
        Danh sách <span style={{ color: "#1CBD74" }}>Taskee đã hoàn thành</span>
      </Divider>

      <ChallengerTable
        idTable="table__taskee__unsubmitted"
        challengeId={challengeId as string}
        typeChallengerInChallenge="submitted"
      />
    </Flex>
  );
};
export default ChallengeDetailsPage;
