import { Avatar, Badge, Button, Flex, TableProps } from "antd";
import { ITaskSolutionEntity } from "../../../../../../types/entity/solution";
import { convertTimestampToVietnamTime } from "../../../../../../utils/convertTime";
import ViewTaskee from "../../../../../../components/Components/ViewTaskee/ViewTaskee";

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

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
    width: 200,
    title: "Hành động",
    key: "actions",
    render: (_, record) => (
      <Flex justify="start" align="center" gap={8}>
        <Button variant="solid" color="primary">
          Kết quả
        </Button>
        <Button variant="outlined" color="primary">
          Mã nguồn
        </Button>
      </Flex>
    ),
  },
];

export default columnsTaskSolutionList;
