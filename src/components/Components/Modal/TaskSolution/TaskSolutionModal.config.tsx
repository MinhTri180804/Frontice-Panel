import { ITaskSolutionEntity } from "../../../../types/entity/solution";
import { Avatar, Badge, Button, Flex, TableProps } from "antd";
import ViewTaskee from "../../ViewTaskee/ViewTaskee";

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const columnsTaskSolution: TableProps<ITaskSolutionEntity>["columns"] = [
  {
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
    title: (
      <Flex align="center" justify="center">
        Tiêu đề
      </Flex>
    ),
    key: "title",
    dataIndex: "title",
    render: (title: string) => (
      <Flex align="center" justify="center">
        {title}
      </Flex>
    ),
  },

  {
    title: (
      <Flex align="center" justify="center">
        Trạng thái
      </Flex>
    ),
    key: "status",
    dataIndex: "status",
    render: (status: string) => (
      <Flex justify="center" align="center">
        {status}
      </Flex>
    ),
  },

  {
    title: "Người thực hiện",
    key: "taskee",
    dataIndex: "taskee",
    render: (_, record) => <ViewTaskee taskee={record.taskee} />,
  },
];

export default columnsTaskSolution;
