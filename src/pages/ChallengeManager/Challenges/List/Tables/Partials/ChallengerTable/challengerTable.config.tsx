import { Button, Flex, TableProps } from "antd";
import { ITaskeeEntity } from "../../../../../../../types/entity/taskee";
import { openNewTab } from "../../../../../../../utils/helper";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FC } from "react";

const challengerTableColumns: TableProps<ITaskeeEntity>["columns"] = [
  {
    title: <div style={{ textAlign: "center" }}>STT</div>,
    key: "stt",
    render: (_, __, index) => (
      <div style={{ textAlign: "center" }}>{index + 1}</div>
    ),
  },
  {
    title: "Họ tên",
    key: "name",
    dataIndex: "lastname",
    render: (_, record) => `${record.firstname} ${record.lastname}`,
  },
  {
    title: "Điểm số",
    key: "points",
    dataIndex: "points",
    render: (points) => <div style={{ textAlign: "center" }}>{points}</div>,
  },
  {
    title: <div style={{ textAlign: "center" }}>Thông tin</div>,
    key: "information",
    render: (_, record) => {
      const handleViewCv = () => {
        openNewTab(record.cv);
      };

      const handleViewGithubProfile = () => {
        openNewTab(record.github);
      };

      return (
        <Flex justify="center" align="center">
          <Button
            variant="link"
            color="primary"
            onClick={handleViewCv}
            disabled={!Boolean(record.cv)}
          >
            CV
          </Button>
          <Button
            variant="link"
            color="primary"
            onClick={handleViewGithubProfile}
            disabled={!Boolean(record.github)}
          >
            Github profile
          </Button>
        </Flex>
      );
    },
  },
  {
    title: "Premium",
    key: "premium",
    dataIndex: "gold_registration_date",
    render: (_, record) => {
      return Boolean(record.gold_registration_date) ? (
        <div style={{ textAlign: "center" }}>
          <CheckOutlined />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <CloseOutlined />
        </div>
      );
    },
  },

  {
    title: "Hành động",
    key: "actions",
    render: (_, record) => (
      <ButtonNavigateDetailsChallenger challenge={record} />
    ),
  },
];

interface IButtonNavigateDetailsChallengerProps {
  challenge: ITaskeeEntity;
}

const ButtonNavigateDetailsChallenger: FC<
  IButtonNavigateDetailsChallengerProps
> = ({}) => {
  // TODO: Implement routes to taskee details
  return (
    <Button variant="outlined" color="primary">
      Xem chi tiết
    </Button>
  );
};

export default challengerTableColumns;
