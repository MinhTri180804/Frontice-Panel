import { Button, Flex, TableProps } from "antd";
import { ITaskSolutionEntity } from "../../../../../../types/entity/solution";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";
import ViewTaskee from "../../../../../../components/Components/ViewTaskee/ViewTaskee";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";
import { openNewTab } from "../../../../../../utils/helper";

interface IActionsProps {
  githubLink: string;
  livePreview: string;
  taskSolutionId: string;
}
const Actions: FC<IActionsProps> = ({
  githubLink,
  livePreview,
  taskSolutionId,
}) => {
  const navigate = useNavigate();
  return (
    <Flex justify="start" align="center" gap={8}>
      <Button
        onClick={() =>
          navigate(
            `/${constantRoutesChallengeManager.pages.tasks.root}/${constantRoutesChallengeManager.pages.tasks.taskSolutionDetails}/${taskSolutionId}`,
          )
        }
      >
        Xem chi tiết
      </Button>
      <Button
        variant="solid"
        color="primary"
        onClick={() => openNewTab(livePreview)}
      >
        Kết quả
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => openNewTab(githubLink)}
      >
        Mã nguồn
      </Button>
    </Flex>
  );
};

const columnsTaskSolutionList: TableProps<ITaskSolutionEntity>["columns"] = [
  {
    fixed: "left",
    width: 100,
    title: (
      <Flex align="center" justify="center">
        STT
      </Flex>
    ),
    key: "stt",
    render: (_, __, index) => (
      <Flex align="center" justify="center">
        {index + 1}
      </Flex>
    ),
  },
  {
    fixed: "left",
    width: 250,
    title: "Tiêu đề",
    key: "title",
    sorter: (a, b) => a.title?.length - b.title?.length,
    dataIndex: "title",
  },
  {
    title: (
      <Flex justify="center" align="center">
        Đăng tải
      </Flex>
    ),
    width: 200,
    key: "submitedAt",
    sorter: (a, b) => a.submittedAt - b.submittedAt,
    dataIndex: "submitedAt",
    render: (timeValue) => {
      const timeFormat = convertTimestampToVietnamTime(timeValue);
      return (
        <Flex align="center" justify="center">
          {timeFormat}
        </Flex>
      );
    },
  },
  {
    width: 120,
    title: (
      <Flex align="center" justify="center">
        Trạng thái
      </Flex>
    ),
    key: "status",
    dataIndex: "status",
    render: (status: string) => (
      <Flex align="center" justify="center">
        {status}
      </Flex>
    ),
  },
  {
    title: (
      <Flex align="center" justify="center">
        Tác giả
      </Flex>
    ),
    width: 260,
    key: "taskee",
    dataIndex: "taskee",
    render: (taskee) => <ViewTaskee taskee={taskee} />,
  },

  {
    width: 350,
    fixed: "right",
    title: "Hành động",
    key: "actions",
    render: (_, record) => (
      <Actions
        livePreview={record.liveGithub}
        githubLink={record.github}
        taskSolutionId={record.id}
      />
    ),
  },
];

export default columnsTaskSolutionList;
