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
import { ReactComponent as Plus } from "../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { Button } from "../../../../custom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../../utils/sanitizeAndLimitString";
import { CreateAdmissionReqDetail, EditAdmissionReqDetail } from "./form";
import { useParams } from "react-router-dom";
import {
  deleteAdmissionRequirementDetailsById,
  getAdmissionRequirementDetailsByAdmissionReqId,
} from "../request";
import DeleteModalContent from "../../../deleteModal/deleteModal";

const AdmissionReqDetail = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [reqDetails, setReqDetails] = useState<AdmissionRequirementDetails>(
    {} as AdmissionRequirementDetails
  );

  const deleteAdmissionRequirementDetailsMutation = useMutation({
    mutationFn: deleteAdmissionRequirementDetailsById,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-admission-requirement-details-by-Id"],
    queryFn: () => getAdmissionRequirementDetailsByAdmissionReqId(Number(id)),
    enabled: !!id,
  });

  const deleteAdmissionReqDetailsHandler = async () => {
    try {
      await deleteAdmissionRequirementDetailsMutation.mutateAsync(
        reqDetails?.id,
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

  const columns: ColumnsType<AdmissionRequirementDetails> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "programType",
      title: "Program Type",
      dataIndex: "programTypeName",
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
              setReqDetails(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setReqDetails(record);
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

  const overviewData = data?.data as AdmissionRequirementDetails[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Admission Requirements Details: Read-More Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={overviewData}
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
        title="Create Overview"
        footer={null}
      >
        <CreateAdmissionReqDetail handleClose={() => setOpen(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Overview"
        footer={null}
      >
        <EditAdmissionReqDetail
          item={reqDetails}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Tuition Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteAdmissionRequirementDetailsMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteAdmissionReqDetailsHandler}
          title={reqDetails?.name}
        />
      </Modal>
    </div>
  );
};

export default AdmissionReqDetail;
