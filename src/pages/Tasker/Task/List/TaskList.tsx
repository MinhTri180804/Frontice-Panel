import { RedoOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Flex, Button, Table, Typography, TableProps, Empty } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import columns from "./TaskList.config";
import { ColumnsType } from "antd/es/table";
import taskerService from "../../../../service/Tasker/taskerService";
import { ITaskOfTaskerEntity } from "../../../../types/response/tasker/task";
import constantRoutesTasker from "../../../../constants/routes/tasker";
import taskerQueryKeys from "../../../../constants/queryKey/tasker/taskerQueryKey";
import { toast } from "react-toastify";

const { Title } = Typography;

const TaskListPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string | number>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<string | number>(
    searchParams.get("limit") || 10,
  );
  const [taskList, setTaskList] = useState<ITaskOfTaskerEntity[]>([]);
  const [totalPage, setTotalPage] = useState<string | number>(0);
  const { isFetching } = useQuery({
    queryKey: [taskerQueryKeys.task.getAll, currentPage, pageSize],
    queryFn: async () => {
      const response = await taskerService.task.getAll({
        page: currentPage as string,
        perPage: pageSize as string,
      });

      const responseData = response.data;
      setTaskList(responseData.tasks);
      setTotalPage(responseData.total);
      return responseData;
    },
  });

  const handleChangeTable: TableProps<ITaskOfTaskerEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination.current && pagination.current !== currentPage) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...currentParams, page: page });
      setCurrentPage(page);
    }

    if (pagination.showSizeChanger && pagination.pageSize) {
      const limit = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...currentParams, limit: limit });
      setPageSize(pagination.pageSize);
    }
  };

  const handleRefreshData = async () => {
    return await toast.promise(
      queryClient.refetchQueries({
        queryKey: [taskerQueryKeys.task.getAll],
      }),
      {
        pending: "Đang thực hiện làm mới dữ liệu",
        success: "Làm mới dữ liệu thành công",
        error: "Làm mới dữ liệu thất bại",
      },
    );
  };

  return (
    <Flex vertical gap={32}>
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
            Danh sách nhiệm vụ của bạn
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              onClick={() => handleRefreshData()}
              // loading={isLoadingRefreshChallengebutton}
            >
              Làm mới
            </Button>

            {/* <Button */}
            {/*   color="primary" */}
            {/*   size="large" */}
            {/*   icon={<FilterOutlined />} */}
            {/*   disabled */}
            {/*   // onClick={() => openDrawerFilter()} */}
            {/* > */}
            {/*   Bộ lọc */}
            {/* </Button> */}
          </Flex>
        </div>
      </Flex>
      <Table
        rowKey={(record) => `${record.id}`}
        loading={isFetching}
        dataSource={taskList}
        columns={columns as ColumnsType<ITaskOfTaskerEntity>}
        pagination={{
          pageSize: pageSize as number,
          current: currentPage as number,
          total: totalPage as number,
          showSizeChanger: true,
        }}
        onChange={handleChangeTable}
        scroll={{ x: "max-content" }}
        showHeader
        sticky
        virtual
        locale={{
          emptyText: (
            <Empty description={"Không tìm thấy nhiệm vụ..."}>
              <Button
                variant="solid"
                color="primary"
                onClick={() => navigate(`${constantRoutesTasker.task.create}`)}
              >
                Tạo nhiệm vụ ngay
              </Button>
            </Empty>
          ),
        }}
      />
    </Flex>
  );
};

export default TaskListPage;
