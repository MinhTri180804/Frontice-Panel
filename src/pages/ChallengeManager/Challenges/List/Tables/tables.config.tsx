import { Modal, TableProps, Avatar, Flex, Button, Tag } from "antd";
import IDataTypeChallengeList from "./tables.type";
import ModalChallenger from "../../../../../components/Components/Modal/Challenger/ModalChallenger";
import { convertTimestampToVietnamTime } from "../../../../../utils/convertTime";

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const challengeListColumn: TableProps<IDataTypeChallengeList>["columns"] = [
  {
    title: "STT",
    key: "stt",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Title",
    key: "title",
    sorter: (a, b) => a.title?.length - b.title?.length,
    dataIndex: "title",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Công nghệ",
    key: "technical",
    dataIndex: "technical",
    render: (technicalList: IDataTypeChallengeList["technical"]) => {
      const [firstTechnical, secondTechinical, ...rest] = technicalList;
      const technicalShow = [firstTechnical, secondTechinical];

      return (
        <div className="technical-challenge">
          {technicalShow.map((technical, index) => (
            <Tag color="cyan" key={`${technical}-${index}`}>
              {technical}
            </Tag>
          ))}
          {rest.length > 0 && <Tag color="red">+ {rest.length}</Tag>}
        </div>
      );
    },
  },
  {
    title: "Cấp độ",
    key: "level",
    dataIndex: "level",
    render: (level: string) => level,
  },
  {
    title: () => <div style={{ textAlign: "center" }}>Tham gia</div>,
    key: "joinTotal",
    dataIndex: "joinTotal",
    sorter: (a, b) => a.joinTotal - b.joinTotal,
    render: (joinTotal: string | number) => (
      <Flex justify="center" align="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            Modal.info({
              width: "800px",
              title: "Danh sách người dã tham gia thử thách",
              okText: "Đóng",
              content: (
                <div style={{ width: "100%" }}>
                  <ModalChallenger />
                </div>
              ),
            });
          }}
        >
          {joinTotal}
        </Button>
      </Flex>
    ),
  },
  {
    title: () => <div style={{ textAlign: "center" }}>Hoàn thành</div>,
    key: "submittedTotal",
    dataIndex: "submittedTotal",
    sorter: (a, b) => a.submittedTotal - b.submittedTotal,
    render: (submittedTotal: number) => (
      <Flex justify="center" align="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            Modal.info({
              width: "800px",
              title: "Danh sách người dã hoàn thành thử thách",
              okText: "Đóng",
              content: (
                <div style={{ width: "100%" }}>
                  <ModalChallenger />
                </div>
              ),
            });
          }}
        >
          {submittedTotal}
        </Button>
      </Flex>
    ),
  },
  {
    title: () => <div style={{ textAlign: "center" }}>Người tạo</div>,
    key: "owner",
    dataIndex: "owner",
    render: (owner: IDataTypeChallengeList["owner"]) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar src={owner.image || defautlAvatar} />
      </div>
    ),
  },

  {
    title: "Thời gian tạo",
    key: "createdAt",
    sorter: (a, b) => a.created_at - b.created_at,
    dataIndex: "created_at",
    render: (time) => <div>{convertTimestampToVietnamTime(time)}</div>,
  },
];

export default challengeListColumn;
