import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  App,
  Spin,
  Image,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import{ CreateSocialMediaSetup, EditSocialMediaLink } from "./setup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteSocialMediaLink, getSocialMediaLinks } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../deleteModal/deleteModal";

const SocialMedia = () => {
  const {notification} = App.useApp()
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [socialMediaLink, setSocialMediaLink] = useState<SocialMediaLink>({} as SocialMediaLink);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteSocialMediaLinkMutation = useMutation({ mutationFn: deleteSocialMediaLink });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-social-media-link"],
    queryFn: getSocialMediaLinks,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns: ColumnsType<SocialMediaLink> = [
    {
      title: 'S/N',
      dataIndex: 'index',
      key: 'index',
      render: (text: any, record: any, index: number) => (
        <span>{((currentPage - 1) * pageSize) + index + 1}</span>
      ),
    },
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "socialMediaName",
      title: "Social Media Name",
      dataIndex: "socialMediaName",
    },
    {
      key: "socialMediaUrl",
      title: "Social Media Url",
      dataIndex: "socialMediaUrl",
      render: (_, { socialMediaUrl }) => <a href={socialMediaUrl} target="_blank" rel="noreferrer">{socialMediaUrl}</a>,
    },
    {
      key: "pictureUrl",
      title: "Logo",
      dataIndex: "socialMediaLogoUrl",
      render: (_, { socialMediaLogoUrl }) => <img src={socialMediaLogoUrl} alt="" className="table-img"/>,
    },
    // {
    //   key: "status",
    //   title: "Status",
    //   dataIndex: "activeStatus",
    //   render: (_, { activeStatus }) => (activeStatus ? "Active" : "Inactive"),
    // },
    {
      key: "action",
      title: "",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Edit",
            onClick: () => {
              setSocialMediaLink(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: (
              <button style={{ border: "0rem" , background: "none"}} onClick={() => handleDelete(record)}>
                Delete
              </button>
            ),
          },
          // {
          //   key: "2",
          //   label: "Delete",
          //   onClick: async () => {
          //     try {
          //       await deleteSocialMediaLinkMutation.mutateAsync(record?.id, {
          //         onSuccess: (data) => {
          //           notification.success({
          //             message: "Success",
          //             description: data?.message,
          //           });
          //           refetch();
          //         },
          //       });
          //     } catch (error: any) {
          //       notification.error({
          //         message: "Error",
          //         description: error?.response?.data?.message,
          //       });
          //     }
          //   },
          // },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  const handleDelete = (data: SocialMediaLink) => {
    setSocialMediaLink(data);
    setOpenDelete(true);
  };
   
  const DeleteSocialMediaLinkHandler = async () => {
    try {
      await deleteSocialMediaLinkMutation.mutateAsync(socialMediaLink?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
          setOpenDelete(false);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };
  const socialMediaLinks = data?.data as SocialMediaLink[];

  
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
          dataSource={socialMediaLinks}
          columns={columns}
          pagination={{ position: ["bottomCenter"] , current: currentPage, pageSize: pageSize , onChange: handlePaginationChange}}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>
      {/* <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Social Media Link Setup"
        footer={null}
      >
        <SocialMediaSetup handleClose={() => setOpen(false)} />
      </Modal> */}

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="About Us Setup"
        footer={null}
      >
        <CreateSocialMediaSetup handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit About Us Setup"
        footer={null}
      >
        <EditSocialMediaLink socialMediaLink={socialMediaLink} handleClose={() => setOpenEdit(false)} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Social Media Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={false}
          // data={Data}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteSocialMediaLinkHandler}
          title={socialMediaLink?.socialMediaName}
          isActive={ false }
          // btnText={"Disable"}
        />
      </Modal>
    </div>
  );
};

export default SocialMedia;
