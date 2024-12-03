import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mentorQueryKey } from "../../../../constants/queryKey/mentor";
import { useState } from "react";
import { ISolutionFeedbackEntity } from "../../../../types/entity/solution";
import mentorService from "../../../../service/Mentor/mentorService";
import { RedoOutlined, FilterOutlined } from "@ant-design/icons";
import { Flex, Button, Table, Empty, TableProps, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import columns from "./solutionList.config";
import { toast } from "react-toastify";

const { Title } = Typography;

const SolutionsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParams.get("page") || 1,
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("limit") || 10,
  );
  const [total, setTotal] = useState<number | string>(0);
  const [solutionsFeedback, setSolutionsFeedback] = useState<
    ISolutionFeedbackEntity[]
  >([]);
  const queryClient = useQueryClient();
  const { isFetching } = useQuery({
    queryKey: [mentorQueryKey.solution.getAll, currentPage, pageSize],
    queryFn: async () => {
      try {
        const response = await mentorService.solution.getAll({
          page: currentPage,
          per_page: pageSize,
        });

        const responseData = response.data;
        setSolutionsFeedback(responseData.solutions);
        setTotal(responseData.total);
        return responseData;
      } catch (error) {
        console.log("[ERROR SOLUTION FEEDBACK]: ", error);
      }
    },
  });

  const refetchData = async () => {
    return await toast.promise(
      queryClient.refetchQueries({
        queryKey: [mentorQueryKey.solution.getAll],
      }),
      {
        pending: "Đang thực hiện làm mới dữ liệu",
        success: "Làm mới dữ liệu thành công",
        error: "Làm mới dữ liệu thất bại",
      },
    );
  };

  const onChangeTable: TableProps<ISolutionFeedbackEntity>["onChange"] = (
    pagination,
  ) => {
    if (pagination?.current && pagination.current !== currentPage) {
      const currentParams = Object.fromEntries(searchParams.entries());
      const currentPageNow = pagination.current.toString();
      setCurrentPage(currentPageNow);
      setSearchParams({ ...currentParams, page: currentPageNow });
    }

    if (
      pagination.pageSize &&
      pagination.showSizeChanger &&
      pagination.pageSize !== pageSize
    ) {
      const currentParams = Object.fromEntries(searchParams.entries());
      const limitCurrentNow = pagination.pageSize.toString();
      setPageSize(pagination.pageSize);
      setSearchParams({ ...currentParams, limit: limitCurrentNow });
    }
  };

  return (
    <Flex gap={32} vertical>
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
            Danh sách giải pháp cần được feedback
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              icon={<RedoOutlined />}
              onClick={() => refetchData()}
              // loading={isLoadingRefreshChallengebutton}
            >
              Làm mới
            </Button>

            <Button
              color="primary"
              size="large"
              disabled
              icon={<FilterOutlined />}
              // onClick={() => openDrawerFilter()}
            >
              Bộ lọc
            </Button>
          </Flex>
        </div>
      </Flex>
      <Table
        columns={columns}
        scroll={{ x: "max-content" }}
        virtual
        showHeader
        sticky
        dataSource={solutionsFeedback}
        loading={isFetching}
        pagination={{
          pageSize: pageSize as number,
          total: total as number,
          current: currentPage as number,
          showSizeChanger: true,
        }}
        onChange={onChangeTable}
        locale={{
          emptyText: (
            <Empty description={"Không tìm thấy giải pháp nào..."}></Empty>
          ),
        }}
      />
    </Flex>
  );
};

export default SolutionsListPage;
