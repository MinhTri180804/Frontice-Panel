import { Table, TableProps } from "antd";
import { FC, useState } from "react";
import IDataTypeChallengeList from "../tables.type";
import challengeListColumn from "../tables.config";
import { useQuery } from "@tanstack/react-query";
import { IGetAllChallengeParams } from "../../../../../../types/request/challenge";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import generateQueryKeyChallenges from "../../challengeList.utils";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";

const DEFAULT_CUREENT_PAGE: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;

const typeChallenges: IGetAllChallengeParams["get"] = "other";

const OtherChallengesTable: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [challenges, setChallenges] = useState<IDataTypeChallengeList[]>([]);
  const columns = challengeListColumn;
  const queryKeys = generateQueryKeyChallenges(
    constantChallengeManagerQueryKey.challenge.otherChallenges,
    {
      page: currentPage,
      perPage: pageSize,
      get: typeChallenges,
    },
  );
  const { isFetching } = useQuery({
    queryKey: queryKeys,
    queryFn: async () => {
      try {
        const response = await challengeManagerService.challenge.getAll({
          page: currentPage,
          perPage: pageSize,
          get: typeChallenges,
        });

        const {
          challenges: challengesResponse = [],
          total: totalResponse = 0,
          currentPage: currentPageResponse = 1,
          perPage: perPageResponse = 10,
        } = response.data;

        setPageSize(perPageResponse);
        setCurrentPage(currentPageResponse);
        setTotal(totalResponse);
        setChallenges(challengesResponse);
        return response.data;
      } catch (error) {
        console.log(error);
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

  return (
    <Table<IDataTypeChallengeList>
      loading={isFetching}
      columns={columns}
      dataSource={challenges}
      onChange={handleChangeTable}
      pagination={{
        current: currentPage,
        total: total,
        pageSize: pageSize,
        showSizeChanger: true,
      }}
    />
  );
};

export default OtherChallengesTable;
