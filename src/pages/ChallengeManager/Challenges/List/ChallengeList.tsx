import { Button, Flex, Tabs } from "antd";
import { FC, useState } from "react";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import { useNavigate } from "react-router-dom";
import challengeListTabs from "./challengeList.tabs";
import { useQueryClient } from "@tanstack/react-query";
import { constantChallengeManagerQueryKey } from "../../../../constants/queryKey/challengeManager";
import { toast } from "react-toastify";

const ChallengeListPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoadingRefreshChallengebutton, setIsLoadingRefreshChallengeButton] =
    useState<boolean>(false);

  const handleChangeTabs = (key: string) => {
    console.log(key);
  };

  const tabsItems = challengeListTabs;

  const revalidateChallenges = async () => {
    setIsLoadingRefreshChallengeButton(true);
    return toast.promise(
      queryClient
        .refetchQueries({
          predicate: (query) =>
            [
              constantChallengeManagerQueryKey.challenge.otherChallenges,
              constantChallengeManagerQueryKey.challenge.myChallenges,
              constantChallengeManagerQueryKey.challenge.allChallenges,
            ].some((key) => JSON.stringify(query.queryKey).includes(key)),
        })
        .finally(() => setIsLoadingRefreshChallengeButton(false)),
      {
        pending: "Đang thực hiện làm mới dữ liệu thử thách",
        success: "Làm mới dữ liệu thử thách thành công",
        error: "Làm mới dữ liệu thử thách thất bại",
      },
    );
  };

  return (
    <>
      <section className="challenges__manager">
        <Flex vertical justify="start" align="stretch" gap={32}>
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
                Danh sách thử thách
              </Title>
            </div>
            <div>
              <Flex justify="flex-end" align="stretch" gap={12}>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  icon={<RedoOutlined />}
                  onClick={() => revalidateChallenges()}
                  loading={isLoadingRefreshChallengebutton}
                >
                  Làm mới
                </Button>

                <Button
                  type="primary"
                  color="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    navigate(
                      constantRoutesChallengeManager.pages.challenges.create,
                    )
                  }
                >
                  Tạo thử thách mới
                </Button>
              </Flex>
            </div>
          </Flex>

          <Tabs items={tabsItems} type="card" onChange={handleChangeTabs} />
        </Flex>
      </section>
    </>
  );
};

export default ChallengeListPage;
