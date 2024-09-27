import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select } from "../../../../custom";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateAdmissionRequirementDetail,
  getProgramTypes,
} from "../request";
import { useParams } from "react-router-dom";

interface SetupInit {
  name: string;
  description: string;
  status: string;
}

export const CreateAdmissionReqDetail = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-program-type"],
    queryFn: getProgramTypes,
  });

  const programTypeData = data?.data ?? [];

  const addAdmissionRequirementDetailMutation = useMutation({
    mutationFn: createOrUpdateAdmissionRequirementDetail,
  });

  const handleAddAdmissionRequirementDetail = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<AdmissionReqDetailsPayload> = {
      id: 0,
      name: values.name,
      admissionRequirementId: Number(id),
      description: values.description,
      noOfSittings: 0,
      programTypeId: Number(values.programType),
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await addAdmissionRequirementDetailMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-admission-requirement-details-by-Id"],
          });
          handleClose();
          resetForm();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inative</option>
    </>
  );

  const programTypeOptions = programTypeData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        programType: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddAdmissionRequirementDetail(values, resetForm);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Input name="name" label="Name" placeholder="Input Name" />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
          />

          <Select
            name="programType"
            label="Program type"
            placeholder="Select program type"
            options={programTypeOptions}
          />

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
          />

          <div className="btn-group">
            <Button
              type="button"
              onClick={handleClose}
              variant="text"
              text="Cancel"
            />
            <Button
              type="submit"
              isLoading={addAdmissionRequirementDetailMutation.isPending}
              disabled={addAdmissionRequirementDetailMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const EditAdmissionReqDetail = ({
  item,
  handleClose,
}: {
  item: AdmissionRequirementDetails;
  handleClose: () => void;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-program-type"],
    queryFn: getProgramTypes,
  });

  const programTypeData = data?.data ?? [];

  const editAdmissionRequirementDetailMutation = useMutation({
    mutationFn: createOrUpdateAdmissionRequirementDetail,
  });

  const handleAddAdmissionRequirementDetail = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<AdmissionReqDetailsPayload> = {
      id: item?.id,
      name: values.name,
      admissionRequirementId: Number(id),
      description: values.description,
      noOfSittings: 0,
      activeStatus: values.status === "Active" ? true : false,
      programTypeId: Number(values.programType),
      isDeleted: false,
    };

    try {
      await editAdmissionRequirementDetailMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-admission-requirement-details-by-Id"],
          });
          handleClose();
          resetForm();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inative</option>
    </>
  );

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";

  const programTypeOptions = programTypeData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  return (
    <Formik
      initialValues={{
        name: item?.name ?? "",
        description: "",
        status: initialStatus,
        programType: item?.programTypeId,
      }}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        handleAddAdmissionRequirementDetail(values, resetForm);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Input name="name" label="Name" placeholder="Input name" />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
            initialData={item?.description}
          />

          <Select
            name="programType"
            label="Program type"
            placeholder="Select program type"
            options={programTypeOptions}
          />

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
          />

          <div className="btn-group">
            <Button
              type="button"
              onClick={handleClose}
              variant="text"
              text="Cancel"
            />

            <Button
              type="submit"
              isLoading={editAdmissionRequirementDetailMutation.isPending}
              disabled={editAdmissionRequirementDetailMutation.isPending}
              text="Update"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
