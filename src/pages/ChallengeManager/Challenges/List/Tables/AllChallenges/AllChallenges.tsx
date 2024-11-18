import { FC, useState } from "react";
import challengeListColumn from "../tables.config";
import IDataTypeChallengeList from "../tables.type";
import { Button, Flex, Modal, Table, TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import { IGetAllChallengeParams } from "../../../../../../types/request/challenge";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";
import { useNavigate } from "react-router-dom";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import generateQueryKeyChallenges from "../../challengeList.utils";

const DEFAULT_CUREENT_PAGE: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;

const typeChallenge: IGetAllChallengeParams["get"] = null;

const AllChallengesTable: FC = () => {
  const colums = challengeListColumn || [];
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CUREENT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState<number>(0);
  const [challengesList, setChallengesList] = useState<
    IDataTypeChallengeList[]
  >([]);
  const navigate = useNavigate();

  const queryKeys = generateQueryKeyChallenges(
    constantChallengeManagerQueryKey.challenge.allChallenges,
    {
      page: currentPage,
      perPage: pageSize,
      get: typeChallenge,
    },
  );

  const { isFetching } = useQuery({
    queryKey: queryKeys,
    queryFn: async () => {
      try {
        const response = await challengeManagerService.challenge.getAll({
          page: currentPage,
          perPage: pageSize,
          get: typeChallenge,
        });

        const {
          challenges = [],
          total = 0,
          perPage = 10,
          // modified name object because same with state
          currentPage: currentPageResponse = 1,
        } = response.data;
        setCurrentPage(currentPageResponse);
        setTotal(total);
        setPageSize(perPage);
        setChallengesList(challenges);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onChangeTable: TableProps<IDataTypeChallengeList>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== currentPage) {
      setCurrentPage((pagination?.current as number) || DEFAULT_CUREENT_PAGE);
    }

    if (pagination.pageSize !== pageSize && pagination.showSizeChanger) {
      setPageSize((pagination?.pageSize as number) || DEFAULT_PAGE_SIZE);
    }
  };

  const actionColumns: TableProps<IDataTypeChallengeList>["columns"] = [
    {
      title: "Hành động",
      key: "actions",
      render: (_, record: IDataTypeChallengeList) => {
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
            </Flex>
          </>
        );
      },
    },
  ];

  return (
    <Table<IDataTypeChallengeList>
      dataSource={challengesList}
      loading={isFetching}
      columns={[...colums, ...actionColumns]}
      pagination={{
        pageSize: pageSize,
        current: currentPage,
        total: total,
        showSizeChanger: true,
      }}
      sticky
      showHeader
      onChange={onChangeTable}
    />
  );
};

export default AllChallengesTable;
