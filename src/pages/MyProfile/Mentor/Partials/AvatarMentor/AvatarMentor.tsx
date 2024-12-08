import { Flex, Space, Avatar, Button } from "antd";
import { FC, useState } from "react";
import { AvatarMentorChangeModal } from "./Partials/AvatarMentorChangeModal";

interface IAvatarMentorProps {
  currentAvatar: string | null;
}

const AvatarMentor: FC<IAvatarMentorProps> = ({ currentAvatar }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return (
    <>
      <Flex vertical align="center" gap={12} justify="center">
        <Space
          style={{
            padding: "4px",
            border: "1px solid #bbbbbb",
            borderRadius: "100%",
          }}
        >
          <Avatar
            style={{ flexShrink: "0" }}
            src={
              currentAvatar ||
              "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOEJmTWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--aced64a3533842d453f2df7174360566061b12fc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bb0ebae071595ab1791dc0ad640ef70a76504047/NFQ-logo-box-orange.png"
            }
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          />
        </Space>
        <Button onClick={() => setIsShowModal(true)}>Đổi ảnh đại diện</Button>
      </Flex>

      <AvatarMentorChangeModal
        isShow={isShowModal}
        currentAvatar={currentAvatar}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
};

export default AvatarMentor;
