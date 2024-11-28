import { FC } from "react";
import useTimeCountDown from "../../../hooks/useTimeCountDown";
import { Button } from "antd";

interface IExpiredTimeProps {
  expiredTime: number;
}

const ViewExpiredTime: FC<IExpiredTimeProps> = ({ expiredTime }) => {
  const timeExpired = useTimeCountDown(expiredTime * 1000);
  return (
    <Button variant="outlined" color="default" style={{ minWidth: "120px" }}>
      {timeExpired?.hours} : {timeExpired?.minutes} : {timeExpired?.seconds}
    </Button>
  );
};

export default ViewExpiredTime;
