import { Button, Flex, Tabs } from "antd";
import { FC } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";
import { useNavigate } from "react-router-dom";
import challengeListTabs from "./challengeList.tabs";

const ChallengeListPage: FC = () => {
  const navigate = useNavigate();

  const handleChangeTabs = (key: string) => {
    console.log(key);
  };

  const tabsItems = challengeListTabs;

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
            </div>
          </Flex>

          <Tabs items={tabsItems} type="card" onChange={handleChangeTabs} />
        </Flex>
      </section>
    </>
  );
};

export default ChallengeListPage;
