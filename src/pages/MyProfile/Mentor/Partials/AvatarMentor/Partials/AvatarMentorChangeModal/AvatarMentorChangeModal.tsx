import { SwapOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Flex, Modal, Image, Upload, Typography, UploadProps } from "antd";
import { FC, useState } from "react";
import useAuthStore from "../../../../../../../store/Auth/authStore";
import uploadService from "../../../../../../../service/Upload";
import { toast } from "react-toastify";
import { logOnDev } from "../../../../../../../utils/helper";
import authService from "../../../../../../../service/authService";
import ImgCrop from "antd-img-crop";
import mutationKey from "../../../../../../../constants/mutation";

interface IAvatarMentorChangeModalProps {
  isShow: boolean;
  onClose: () => void;
  currentAvatar: string | null;
}

const { Text } = Typography;

const AvatarMentorChangeModal: FC<IAvatarMentorChangeModalProps> = ({
  isShow,
  onClose,
  currentAvatar,
}) => {
  const [avatarUpload, setAvatarUpload] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadProps["fileList"]>([]);
  const accountId = useAuthStore((state) => state.profile?.id);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const mutationRemoveFile = useMutation({
    mutationKey: [mutationKey.removeAvatar, accountId],
    mutationFn: async (files: string[]) => {
      if (avatarUpload) {
        return await authService.removeFile({ path: files });
      }
    },
  });

  const mutationUploadAvatar = useMutation({
    mutationKey: ["upload-avatar", accountId],
    mutationFn: async (avatar: File) =>
      await uploadService.avatar.upload({ image: avatar }),
  });

  const mutationUpdateProfile = useMutation({
    mutationKey: ["update-profile", accountId],
    mutationFn: async () => {
      return await authService.updateProfile({ image: avatarUpload as string });
    },
  });

  const customRequestChangeAvatar: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    return await toast.promise(
      mutationUploadAvatar
        .mutateAsync(file as File)
        .then((response) => {
          const imageResponseUrl = response.data.path;
          if (imageResponseUrl && onSuccess) {
            setAvatarUpload(imageResponseUrl);
            setFileList([
              {
                uid: "123",
                name: "avatar-new",
                url: response.data.link,
              },
            ]);
            onSuccess(imageResponseUrl);
            return;
          }
        })
        .catch((error) => {
          onError && onError(error);
        }),
      {
        pending: "Đang thực hiện đăng tải ảnh đại diện",
        success: "Đăng tải ảnh đại diện thành công",
        error: "Đăng tải ảnh đại diện thất bại",
      },
    );
  };

  const handleOnCancel = () => {
    Modal.confirm({
      title: "Xác nhận hủy bỏ thay đổi ảnh đại diện",
      content:
        "Bạn vừa đăng tải 1 ảnh đại diện mới nhưng chưa cập nhật cho tài khoản của mình, bạn chắc chắn mình sẽ hủy bỏ hình ảnh vừa đăng tải chứ ?",
      okText: "Xác nhận hủy bỏ",
      cancelText: "Quay lại",
      onOk: () => {
        if (avatarUpload) {
          console.log("go");
          mutationRemoveFile.mutate([avatarUpload]);
        }
        setAvatarUpload(null);
        setFileList([]);
        onClose();
      },
      onCancel: () => {
        logOnDev(
          "Modal confirm remove avatar upload and back to previous page",
        );
      },
    });
  };

  const handleOnOk = async () => {
    if (avatarUpload === null) {
      toast.error("bạn chưa đăng tải anh đại diện mới");
      return;
    }
    return toast.promise(
      mutationUpdateProfile.mutateAsync().then((response) => {
        if (currentAvatar) {
          mutationRemoveFile.mutate([currentAvatar]);
        }
        onClose();
        setFileList([]);
        setAvatarUpload(null);
        updateProfile(response.data);
      }),
      {
        pending: "Đang thực hiện cập nhật ảnh đại diện",
        error: "Cập nhật ảnh đại diện thất bại",
        success: "Cập nhật ảnh đại diện thành công",
      },
    );
  };

  return (
    <Modal
      open={isShow}
      onCancel={() => {
        if (avatarUpload) {
          return handleOnCancel();
        }
        onClose();
      }}
      onOk={handleOnOk}
      title="Thay đổi ảnh đại diện"
      okText="Thay đổi"
      cancelText="Hủy bỏ"
      cancelButtonProps={{ color: "danger", variant: "outlined" }}
      okButtonProps={{ disabled: !Boolean(avatarUpload) }}
    >
      <Flex
        justify="center"
        align="center"
        gap={32}
        style={{ margin: "24px 0" }}
      >
        <Flex justify="center" align="center" vertical gap={8}>
          <Text>Ảnh hiển tại</Text>
          <Image
            src={
              currentAvatar ||
              "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOEJmTWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--aced64a3533842d453f2df7174360566061b12fc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bb0ebae071595ab1791dc0ad640ef70a76504047/NFQ-logo-box-orange.png"
            }
            style={{ borderRadius: "100%", objectFit: "cover" }}
            width={100}
            height={100}
          />
        </Flex>
        <SwapOutlined
          style={{ fontSize: "24px", marginTop: "30px", color: "#b0b0b0" }}
        />
        <Flex justify="center" align="center" gap={8} vertical>
          <Text>Ảnh mới</Text>
          <ImgCrop>
            <Upload
              listType="picture-circle"
              maxCount={1}
              style={{
                width: "200px",
              }}
              customRequest={customRequestChangeAvatar}
              disabled={mutationUploadAvatar.isPending}
              onRemove={() => {
                setAvatarUpload(null);
                setFileList([]);
              }}
              fileList={fileList}
            >
              {!avatarUpload && "Đăng tải"}
            </Upload>
          </ImgCrop>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AvatarMentorChangeModal;
