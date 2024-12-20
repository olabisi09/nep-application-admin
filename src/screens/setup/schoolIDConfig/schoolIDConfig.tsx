/* eslint-disable no-undef */
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  Button as AntButton,
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Spin,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";

import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";

import { CreateSchoolID, EditSchoolID } from "./form";
import { getAllSchoolID } from "./request";

const SchoolID = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [record, setRecord] = useState<SchoolID>({} as SchoolID);
//   const [openDelete, setOpenDelete] = useState(false); 

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-school-id"],
    queryFn: () => getAllSchoolID(),
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

  const columns: ColumnsType<SchoolID> = [
    {
      key: "code",
      title: "Code Name",
      dataIndex: "codeName",
    },
    {
      key: "value",
      title: "Code Value",
      dataIndex: "value",
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
              setRecord(record);
              setOpenEdit(true);
            },
          },
        //   {
        //     key: "2",
        //     label: "Delete",
        //     onClick: () => {
        //       setRecord(record);
        //       setOpenDelete(true);
        //     },
        //   },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  const aboutUs = data?.data as SchoolID[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <section className="space-between">
        <h3>School ID Setup</h3>
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
        title="Create School ID Setup"
        footer={null}
      >
        <CreateSchoolID handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit School ID Setup"
        footer={null}
      >
        <EditSchoolID item={record} handleClose={() => setOpenEdit(false)} />
      </Modal>
      {/* <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete About Us Setup"
        footer={null}
      >
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

export default SchoolID;
