import { FC, useState } from "react";
import useSolutionListLogic from "./solutionList.logic";
import { IGetAllSolutionResponse } from "../../../../types/request/solution";
import { Button, Table, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import columnsSolutionList from "./SolutionList.config";
import { ISolutionEntity } from "../../../../types/entity/solution";

type DataType = ISolutionEntity;

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
      fixed: "right",
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
        columns={[...(columnsSolutionList || []), ...actionsColumn]}
        scroll={{ x: "max-content" }}
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
