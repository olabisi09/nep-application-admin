import {
  Card,
  Dropdown,
  MenuProps,
  Table,
  Button as AntButton,
  Spin,
  PaginationProps,
} from "antd";
//   import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
//   import Button from "../../../custom/button/button";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { getAllStudentUser } from "./request";
import { useState } from "react";
//   import { CreateSchoolID, EditSchoolID } from "./form";

const StudentUser = () => {
  // const [open, setOpen] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [record, setRecord] = useState<User>({} as User);
  //   const [openDelete, setOpenDelete] = useState(false);
  const [current, setCurrent] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-student-users"],
    queryFn: () => getAllStudentUser(current, 10),
  });

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

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

  const columns: ColumnsType<User> = [
    {
      key: "appNo",
      title: "Application Number",
      dataIndex: "applicationNumber",
    },
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "lastName",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "middleName",
      title: "Middle Name",
      dataIndex: "middleName",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "phoneNo",
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      key: "action",
      title: "",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          // {
          //   key: "1",
          //   label: "Edit",
          //   onClick: () => {
          //     setRecord(record);
          //     setOpenEdit(true);
          //   },
          // },
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

  const userData = data?.data as User[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student User Setup</h3>
        {/* <Button
            onClick={() => setOpen(true)}
            iconBefore={<Plus />}
            text="Setup"
          /> */}
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={userData}
          columns={columns}
          rowKey={(record) => record.applicantId}
          scroll={{ x: true }}
          pagination={{
            position: ["bottomCenter"],
            current: current,
            total: data?.totalSize,
            onChange: onChange,
          }}
        />
      </Card>

      {/* <Modal
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
        </Modal> */}
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

export default StudentUser;
