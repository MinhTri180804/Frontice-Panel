import { FC, useState } from "react";
import useSolutionListLogic from "./solutionList.logic";
import { IGetAllSolutionResponse } from "../../../../types/request/solution";
import { Avatar, Badge, Button, Flex, Table, TableProps } from "antd";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";
import { useNavigate } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";

type DataType = IGetAllSolutionResponse["solutions"]["0"];
const defautlAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    key: "stt",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Tiêu đề",
    key: "title",
    sorter: (a, b) => a?.title?.length - b?.title?.length,
    dataIndex: "title",
  },
  {
    title: "Lượt thích",
    sorter: (a, b) => a.liked - b.liked,
    key: "liked",
    dataIndex: "liked",
  },
  {
    title: "Lượt không thích",
    sorter: (a, b) => a.disliked - b.disliked,
    key: "dislike",
    dataIndex: "disliked",
  },
  {
    title: "Đăng tải",
    key: "submitedAt",
    sorter: (a, b) => a.submitedAt - b.submitedAt,
    dataIndex: "submitedAt",
    render: (timeValue) => {
      const timeFormat = convertTimestampToVietnamTime(timeValue);
      return <div>{timeFormat}</div>;
    },
  },
  {
    title: "Bình luận",
    key: "comment",
    dataIndex: "comment",
    sorter: (a, b) => a.comment - b.comment,
    render: (commentValue) => {
      return (
        <>
          <Button variant="text" color="primary">
            {commentValue}
          </Button>
        </>
      );
    },
  },
  {
    title: "Tác giả",
    key: "taskee",
    dataIndex: "taskee",
    render: (taskee) => {
      return (
        <Button variant="text" color="primary" size="large">
          <Flex justify="flex-start" align="center" gap={12}>
            {taskee.gold_account ? (
              <Badge dot color="volcano">
                <Avatar src={taskee.image || defautlAvatar} />
              </Badge>
            ) : (
              <Avatar src={taskee.image || defautlAvatar} />
            )}
            <div className="full_name">
              {taskee.firstname} {taskee.lastname}
            </div>
          </Flex>
        </Button>
      );
    },
  },
];

const SolutionListPage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const { querySolutionList } = useSolutionListLogic({
    querySoltuionListParams: { page: page, per_page: perPage },
  });
  const navigate = useNavigate();

  const { data: dataSolutionList, isPending } = querySolutionList;

  const dataSource: DataType[] = dataSolutionList?.solutions || [];

  const onChangeTable: TableProps<DataType>["onChange"] = (pagination) => {
    console.log(pagination);
    setPage(pagination?.current || 1);
    if (pagination.showSizeChanger) {
      setPerPage(pagination?.pageSize || 10);
    }
    querySolutionList.refetch();
  };

  const actionsColumn: TableProps<DataType>["columns"] = [
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() =>
              navigate(
                `${constantRoutesChallengeManager.pages.solutions.details}/${record.id}`,
              )
            }
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={[...columns, ...actionsColumn]}
        dataSource={dataSource}
        loading={isPending}
        pagination={{
          pageSize: dataSolutionList?.perPage,
          total: dataSolutionList?.total,
          current: dataSolutionList?.currentPage,
          showSizeChanger: true,
        }}
        onChange={onChangeTable}
      />
    </div>
  );
};

export default SolutionListPage;
