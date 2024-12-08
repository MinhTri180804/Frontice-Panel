import { Divider, Table, Typography } from "antd";

const { Title } = Typography;
const TablesChallengeInformation = () => {
  const isFetching = false;
  return (
    <>
      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách thử thách đã tham gia
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách thử thách chưa hoàn thành
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách thử thách đã hoàn thành
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />
    </>
  );
};

export default TablesChallengeInformation;
