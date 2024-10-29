import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  Spin,
  App,
} from "antd";
import { ReactComponent as Plus } from "../../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../../assets/ellipsis.svg";
import { Button } from "../../../../../custom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteCampusExperienceImage,
  getCampusExperienceImagesByCampusExperienceId,
} from "../../../../../requests";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import CampusExperienceImageForm from "./campusExperienceImageForm";
import DeleteModalContent from "../../../../deleteModal/deleteModal";

const CampusExperienceImages = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [campusExperience, setCampusExperience] =
    useState<CampusExperienceImage>({} as CampusExperienceImage);

  const deleteCampusExperienceImageMutation = useMutation({
    mutationFn: deleteCampusExperienceImage,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-fitness-image", id],
    queryFn: () => getCampusExperienceImagesByCampusExperienceId(id!),
    enabled: !!id,
  });

  const deleteCampusExperienceImageHandler = async () => {
    try {
      await deleteCampusExperienceImageMutation.mutateAsync(
        campusExperience.id,
        {
          onSuccess: (data) => {
            notification.success({
              message: "Success",
              description: data?.message,
            });
            refetch();
            setOpenDelete((prevState) => !prevState);
          },
        }
      );
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<CampusExperienceImage> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "pictureUrl",
      title: "Picture",
      dataIndex: "imageUrl",
      render: (_, { imageUrl }) => (
        <img className="table-img" src={imageUrl} alt="" />
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { activeStatus }) => (activeStatus ? "Active" : "Inactive"),
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
              setCampusExperience(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setCampusExperience(record);
              setOpenDelete((prevState) => !prevState);
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

  const campusExperienceImageData = data?.data as CampusExperienceImage[];

  const handleOpenModal = () => {
    setCampusExperience({} as CampusExperienceImage);
    setOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life: Campus Experience Images Setup</h3>
        <Button
          onClick={handleOpenModal}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={campusExperienceImageData}
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
        title="Create Campus Experience Image"
        footer={null}
      >
        <CampusExperienceImageForm
          item={campusExperience}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Campus Experience Image"
        footer={null}
      >
        <CampusExperienceImageForm
          item={campusExperience}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Campus Experience Image"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteCampusExperienceImageMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteCampusExperienceImageHandler}
          title="this item"
        />
      </Modal>
    </div>
  );
};

export default CampusExperienceImages;
