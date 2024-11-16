import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Switch,
  UploadProps,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { FC } from "react";

const { TextArea } = Input;

const propsDragger: UploadProps = {
  name: "file",
  maxCount: 1,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  accept: ".zip",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const ChallengeUploadPage: FC = () => {
  const navigate = useNavigate();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Form layout="vertical" style={{ maxWidth: 600, margin: "0 auto" }}>
        <Flex justify="space-between" align="stretch" gap={24}>
          <Form.Item label="Tiêu đề thử thách" style={{ flex: "1" }}>
            <Input placeholder="Nhập tiêu đề thử thách" />
          </Form.Item>
          <Form.Item label="Premium" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Flex>
        <Flex justify="space-between" align="stretch" gap={24}>
          <Form.Item label="Công nghệ sử dụng" style={{ flex: "2" }}>
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Chọn các công nghệ sử dụng cho thử thách"
            >
              <Select.Option value="html">HTML</Select.Option>
              <Select.Option value="css">CSS</Select.Option>
              <Select.Option value="javascript">Javascript</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Cấp độ thử thách" style={{ flex: "1" }}>
            <Select placeholder="Chọn cấp độ của thử thách">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
        </Flex>
        <Form.Item label="Điểm số cộng thêm cho thử thách ">
          <Slider max={50} defaultValue={0} />
        </Form.Item>
        <Form.Item label="Mô tả ngắn">
          <TextArea placeholder="Nhập mô tả ngắn cho thử thách" rows={4} />
        </Form.Item>
        <Form.Item
          label="Đăng tải nguồn thử thách"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Dragger {...propsDragger}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          label="Đăng tải file thiết kế của thử thách"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Dragger {...propsDragger}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          label="Đăng tải hình ảnh thử thách"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Dragger {...propsDragger}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>

        <Flex justify="stretch" align="stretch" gap={12}>
          <Button type="primary" style={{ flex: "2" }} size="large" disabled>
            Đăng tải
          </Button>
          <Button
            variant="dashed"
            color="danger"
            style={{ flex: "1" }}
            size="large"
            onClick={() =>
              Modal.confirm({
                title: "Xác nhận thoát",
                content:
                  "Khi thoát bạn các dữ liệu sẽ được gỡ bỏ khỏi hệ thống",
                okText: "Chấp nhận",
                cancelText: "Hủy bỏ",
                onOk: () => {
                  navigate(-1);
                },
              })
            }
          >
            Quay lại
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default ChallengeUploadPage;
