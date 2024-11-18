import { Avatar, Button, Flex, Modal, Table, TableProps, Tag } from "antd";
import { FC, useState } from "react";
import useChallengeListLogic from "./challengeList.logic";
import { IChallengeEntity } from "../../../../types/entity/challenge";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import useAuthStore from "../../../../store/Auth/authStore";
import ModalChallenger from "../../../../components/Components/Modal/Challenger/ModalChallenger";
import { useNavigate } from "react-router-dom";

type DataType = IChallengeEntity;

const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const challengeColumns: TableProps<DataType>["columns"] = [
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
    render: (technicalList: IChallengeEntity["technical"]) => {
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
    render: (owner: IChallengeEntity["owner"]) => (
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
  // {
  //   title: "Hành động",
  //   key: "actions",
  //   //TODO: Implement logic view details challenge action
  //   render: (_, record) => {
  //     const { mutationRemove } = useChallengeListLogic({});
  //
  //     return (
  //       <>
  //         <Flex gap={12} justify="start" align="center">
  //           <Button type="primary">Xem chi tiết</Button>
  //           <Button
  //             variant="dashed"
  //             color="danger"
  //             onClick={() => mutationRemove.mutate(record.id)}
  //           >
  //             Xóa
  //           </Button>
  //         </Flex>
  //       </>
  //     );
  //   },
  // },
];

const ChallengeListPage: FC = () => {
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("newest");
  const [perPage, setPerPage] = useState<number>(10);
  const { queryChallengeList, mutationRemove } = useChallengeListLogic({
    queryChallengeListParams: { page, sort, perPage },
  });


  const { data: challengeListData, isPending: pendingOfChallenges } =
    queryChallengeList;
  const dataSource: DataType[] = challengeListData?.challenges || [];

  const handleChangeTable: TableProps<DataType>["onChange"] = (pagination) => {
    setPage(pagination?.current as number);
    if (pagination?.showSizeChanger) {
      setPerPage(pagination?.pageSize || 10);
    }
    queryChallengeList.refetch();
  };

  const actionColumns: TableProps<DataType>["columns"] = [
    {
      title: "Hành động",
      key: "actions",
      //TODO: Implement logic view details challenge action
      render: (_, record: DataType) => {
        return (
          <>
            <Flex gap={12} justify="start" align="center">
              <Button
                type="primary"
                onClick={() =>
                  navigate(
                    `${constantRoutesChallengeManager.pages.challenges.details}/:${record.id}`,
                  )
                }
              >
                Xem chi tiết
              </Button>

              {record.owner.id === profile?.id && (
                <Button
                  variant="dashed"
                  color="danger"
                  onClick={() => {
                    Modal.confirm({
                      title: "Xác nhận xóa thử thách",
                      cancelText: "Quay lại",
                      okText: "Đồng ý",
                      onOk: () => {
                        mutationRemove.mutate({ challengeId: record.id });
                      },
                    });
                  }}
                >
                  Xóa
                </Button>
              )}
            </Flex>
          </>
        );
      },
    },
  ];

  const handleChangeTabs = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <section className="challenges__manager">
        <Flex vertical justify="start" align="stretch" gap={32}>
          <Flex
            justify="space-between"
            align="center"
            style={{
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div>
              <Title level={3} style={{ margin: "0" }}>
                Danh sách thử thách
              </Title>
            </div>
            <div>
              <Button
                type="primary"
                color="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() =>
                  navigate(
                    constantRoutesChallengeManager.pages.challenges.create,
                  )
                }
              >
                Tạo thử thách mới
              </Button>
            </div>
          </Flex>

          <Table
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: challengeListData?.perPage,
              current: challengeListData?.currentPage,
              total: challengeListData?.total,
              showSizeChanger: true,
            }}
            columns={[...challengeColumns, ...actionColumns]}
            loading={pendingOfChallenges}
            dataSource={dataSource}
            onChange={handleChangeTable}
          ></Table>
        </Flex>
      </section>
    </>
  );
};

export default ChallengeListPage;
