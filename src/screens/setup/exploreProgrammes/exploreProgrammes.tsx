import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  Spin,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import { getAllExplore } from "./request";
import { CreateExplore, EditExplore } from "./addExploreProgrammes";
import { useQuery } from "@tanstack/react-query";

const ExploreProgrammes = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [explore, setExplore] = useState<Explore>({} as Explore);
  // const [openDelete, setOpenDelete] = useState(false);  
  // const [record, setRecord] = useState<AboutUs>({} as AboutUs);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-explore"],
    queryFn: getAllExplore,
  });

  // const deleteAboutUsMutation = useMutation({ mutationFn: deleteAboutUs });

  // const deleteAboutUsHandler = async () => {
  //   try {
  //     await deleteAboutUsMutation.mutateAsync(about?.id, {
  //       onSuccess: (data) => {
  //         notification.success({
  //           message: "Success",
  //           description: data?.message,
  //         });
  //         refetch();
  //         setOpenDelete((prevState) => !prevState);
  //       },
  //     });
  //   } catch (error: any) {
  //     notification.error({
  //       message: "Error",
  //       description: error?.response?.data?.message,
  //     });
  //   }
  // };

  const columns: ColumnsType<Explore> = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (_, { description }) => {
        const limitedCleanHtml = sanitizeAndLimitString(description);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { isActive }) => (isActive ? "Active" : "Inactive"),
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
              setExplore(record);
              setOpenEdit(true);
            },
          },
          // {
          //   key: "2",
          //   label: "Delete",
          //   onClick: () => {
          //     setAbout(record);
          //     setOpenDelete(true);
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

  const aboutUs = data?.data as Explore[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Explore Programmes Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={aboutUs}
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
        title="Create Explore Programmes Setup"
        footer={null}
      >
        <CreateExplore handleClose={() => setOpen(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Explore Programmes Setup"
        footer={null}
      >
        <EditExplore item={explore} handleClose={() => setOpenEdit(false)} />
      </Modal>

      {/* <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete About Us Setup"
          footer={null}>
          <DeleteModalContent
            isLoading={deleteAboutUsMutation?.isPending}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={deleteAboutUsHandler}
            title={about?.title}
          />
        </Modal> */}
    </div>
  );
};

export default ExploreProgrammes;
