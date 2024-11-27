import { FC } from "react";
import { ITaskEntity } from "../../../types/entity/task";
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Statistic,
  Tag,
  Typography,
  Image,
} from "antd";
import { convertTimestampToVietnamTime } from "../../../utils/convertTime";
import useTimeCountDown from "../../../hooks/useTimeCountDown";
import { useNavigate } from "react-router";

interface ITaskOverviewProps {
  taskData: ITaskEntity;
  isLoading: boolean;
  buttonToTaskDetails?: boolean;
}

const { Text, Title } = Typography;

const TaskOverview: FC<ITaskOverviewProps> = ({
  taskData,
  isLoading,
  buttonToTaskDetails = false,
}) => {
  const timeCreatedAt = convertTimestampToVietnamTime(taskData?.created_at);
  const expiredTime = useTimeCountDown(taskData?.expiredAt * 1000);
  const navigate = useNavigate();
  return (
    <Card loading={isLoading}>
      <Row gutter={24} align={"middle"}>
        <Col span={14}>
          <Flex
            vertical
            justify="start"
            align="stretch"
            gap={24}
            style={{ flex: 2, width: "100%" }}
          >
            <Flex justify="space-between" align="center">
              <Flex vertical justify="start" align="stretch" gap={4}>
                <Text style={{ color: "grey", fontSize: "14px" }}>
                  {timeCreatedAt}
                </Text>
                <Title level={2} style={{ margin: 0 }}>
                  {taskData?.title}
                </Title>
              </Flex>
            </Flex>
            <Flex>
              {taskData?.technical.map((item, index) => (
                <Tag key={index} color="geekblue">
                  {item}
                </Tag>
              ))}
            </Flex>
            <Text>{taskData?.shortDes}</Text>
            <Flex justify="start" align="stretch" gap={12}>
              <Card>
                <Statistic
                  title="Số điểm yêu cầu"
                  precision={2}
                  valueRender={() => (
                    <div style={{ fontSize: "18px" }}>
                      {taskData?.requiredPoint}
                    </div>
                  )}
                />
              </Card>
              <Card>
                <Statistic
                  title="Thời gian còn lại"
                  precision={2}
                  valueRender={() => (
                    <div style={{ fontSize: "18px" }}>
                      {expiredTime?.hours} : {expiredTime?.minutes} :{" "}
                      {expiredTime?.seconds}
                    </div>
                  )}
                />
              </Card>
            </Flex>
            {buttonToTaskDetails && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ width: "60%" }}
                onClick={() => navigate(`/taskDetails`)}
              >
                Chi tiết thử thách
              </Button>
            )}
          </Flex>
        </Col>
        <Col span={10}>
          <Image
            src={taskData?.image}
            height={300}
            width={"100%"}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TaskOverview;
