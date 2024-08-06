import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  App,
  Spin,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { CreateSocialMedia, EditSocialMedia } from "./setup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteSocialMedia, getSocialMedia } from "../../../requests";
import { ColumnsType } from "antd/es/table";

const SocialMedia = () => {
  const { notification } = App.useApp();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [social, setSocial] = useState<SocialMedia>({} as SocialMedia);

  const deleteSocialMediaMutation = useMutation({
    mutationFn: deleteSocialMedia,
  });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-about-us"],
    queryFn: getSocialMedia,
  });

  const columns: ColumnsType<SocialMedia> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "url",
      title: "URL",
      dataIndex: "url",
    },
    {
      key: "action",
      title: "",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Edit",
            onClick: () => {
              setSocial(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: async () => {
              try {
                await deleteSocialMediaMutation.mutateAsync(record.id, {
                  onSuccess: (data) => {
                    notification.success({
                      message: "Success",
                      description: data?.message,
                    });
                    refetch();
                  },
                });
              } catch (error: any) {
                notification.error({
                  message: "Error",
                  description: error?.response?.data?.message,
                });
              }
            },
          },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  const socialMedia = data?.data as SocialMedia[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Social Media Link Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={socialMedia}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Social Media Link Setup"
        footer={null}
      >
        <CreateSocialMedia handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default SocialMedia;
