import { Button, Flex } from "antd";
import { FC } from "react";

const ActionsSolutionDetails: FC = () => {
  return (
    <Flex gap={24}>
      <Button
        size="large"
        variant="solid"
        color="primary"
        style={{ width: "100%" }}
      >
        Xem kết quả
      </Button>
      <Button
        size="large"
        variant="outlined"
        color="primary"
        style={{ width: "100%" }}
      >
        Xem mã nguồn
      </Button>
      <Button
        size="large"
        variant="dashed"
        color="danger"
        style={{ width: "100%" }}
      >
        Xóa giải pháp
      </Button>
    </Flex>
  );
};

export default ActionsSolutionDetails;
