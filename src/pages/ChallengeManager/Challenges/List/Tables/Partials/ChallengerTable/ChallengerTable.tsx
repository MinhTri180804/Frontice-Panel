import { Table, TableProps } from "antd";
import { FC, useState } from "react";
import { ITaskeeEntity } from "../../../../../../../types/entity/taskee";
import { constantChallengeManagerQueryKey } from "../../../../../../../constants/queryKey/challengeManager";
import { IGetAllTaskeeInChallengeParams } from "../../../../../../../types/request/taskee";
import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../../../../../../service/ChallengeManager/challengeManagerService";
import { logOnDev } from "../../../../../../../utils/helper";
import challengerTableColumns from "./challengerTable.config";
import { persist } from "zustand/middleware";

type IDatatypeChallenger = ITaskeeEntity;

interface IChallengerTableProps {
  challengeId: string;
  typeChallengerInChallenge: IGetAllTaskeeInChallengeParams["query"];
}

const ChallengerTable: FC<IChallengerTableProps> = ({
  challengeId,
  typeChallengerInChallenge,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleChangeTable: TableProps<IDatatypeChallenger>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination?.current || 1);
    }

    if (pagination.showSizeChanger && pagination.pageSize !== pageSize) {
      setPageSize(pagination?.pageSize || 10);
    }
  };
  const { data, isFetching } = useQuery({
    queryKey: [
      constantChallengeManagerQueryKey.taskee.getAllTaskeeInChallenge,
      typeChallengerInChallenge,
      challengeId,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response =
          await challengeManagerService.taskee.getAllTaskeeInChallenge({
            challengeId: challengeId,
            query: typeChallengerInChallenge,
            page: currentPage,
            perPage: pageSize,
          });

        const responseData = response.data;
        return responseData;
      } catch (error) {
        logOnDev(`${error}`);
      }
    },
  });

  const columns = challengerTableColumns;
  return (
    <Table<IDatatypeChallenger>
      columns={columns}
      dataSource={data?.taskees}
      loading={isFetching}
      pagination={{
        current: data?.currentPage,
        pageSize: data?.perPage,
        total: data?.total,
        showSizeChanger: true,
      }}
      onChange={handleChangeTable}
    />
  );
};

export default ChallengerTable;
