import { Divider, Table, Typography } from "antd";
import { ISolutionEntity } from "../../../../types/entity/solution";
import { FC } from "react";
import { columnsSolutionList } from "./tableChallengeInformation.config";

const { Title } = Typography;
interface ITableChallengeInformationProps {
  solutionData: ISolutionEntity[];
  isLoading: boolean;
}

const TablesChallengeInformation: FC<ITableChallengeInformationProps> = ({
  solutionData,
  isLoading,
}) => {
  return (
    <>
      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách các giải pháp
        </Title>
      </Divider>

      <Table
        scroll={{ x: "max-content" }}
        virtual
        showHeader
        sticky
        columns={columnsSolutionList}
        dataSource={solutionData}
        loading={isLoading}
      />
    </>
  );
};

export default TablesChallengeInformation;
