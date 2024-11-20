import { Button, Empty, Flex, Modal, Table, TableProps } from "antd";
import { useState } from "react";
import IDataTypeChallengeList from "../tables.type";
import challengeListColumn from "../tables.config";
import { useQuery } from "@tanstack/react-query";
import { IGetAllChallengeParams } from "../../../../../../types/request/challenge";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import { Link, useNavigate } from "react-router-dom";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";
import { PlusOutlined } from "@ant-design/icons";
import generateQueryKeyChallenges from "../../challengeList.utils";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import { ActionChallenge } from "../Partials/ActionChallenge";

const DEFAULT_CUREENT_PAGE: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;

const typeChallenge: IGetAllChallengeParams["get"] = "owner";

const MyChallengesTable = () => {
  const [modalRemove, setModalRemove] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CUREENT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [challengesList, setChallengesList] = useState<
    IDataTypeChallengeList[]
  >([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(0);
  const columns = challengeListColumn || [];

  const queryKeys = generateQueryKeyChallenges(
    constantChallengeManagerQueryKey.challenge.myChallenges,
    {
      page: currentPage,
      perPage: pageSize,
      get: typeChallenge,
    },
  );

  const { isFetching } = useQuery({
    queryKey: queryKeys,
    queryFn: async () => {
      const params: IGetAllChallengeParams = {
        page: currentPage,
        perPage: pageSize,
        get: typeChallenge,
      };
      try {
        const response = await challengeManagerService.challenge.getAll(params);
        const {
          challenges = [],
          total = 0,
          currentPage = 1,
          perPage = 10,
        } = response.data;
        setChallengesList(challenges);
        setPageSize(perPage);
        setCurrentPage(currentPage);
        setTotal(total);
      } catch (error) {
        setChallengesList([]);
        console.log("Error: ", error);
      }
    },
  });

  const handleChangeTable: TableProps<IDataTypeChallengeList>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination.current || DEFAULT_CUREENT_PAGE);
    }

    if (pagination.showSizeChanger && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize || DEFAULT_PAGE_SIZE);
    }
  };

  const buttonCreateChallenge = (
    <Button size="large" icon={<PlusOutlined />}>
      <Link to={constantRoutesChallengeManager.pages.challenges.create}>
        Tạo thử thách
      </Link>
    </Button>
  );

  const actionColumns: TableProps<IDataTypeChallengeList>["columns"] = [
    {
      title: "Hành động",
      fixed: "right",
      key: "actions",
      render: (_, record: IDataTypeChallengeList) => (
        <ActionChallenge challenge={record} />
      ),
    },
  ];

  return (
    <Table<IDataTypeChallengeList>
      loading={isFetching}
      scroll={{ x: "max-content" }}
      columns={[...columns, ...actionColumns]}
      dataSource={challengesList}
      pagination={{
        pageSize: pageSize,
        current: currentPage,
        total: total,
        showSizeChanger: true,
      }}
      onChange={handleChangeTable}
      locale={{
        emptyText: (
          <Empty description={"Bạn chưa đăng tải thử thách nào..."}>
            {buttonCreateChallenge}
          </Empty>
        ),
      }}
    />
  );
};

export default MyChallengesTable;
