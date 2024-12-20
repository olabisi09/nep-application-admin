/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { useParams } from "react-router-dom";
import { object } from "yup";

import { Button, Editor, Input, Select } from "../../../../custom";
import { validator } from "../../../../utils/validator";
import { createOrUpdateCareerProspectItem } from "../request";

interface SetupInit {
  name: string;
  description: string;
  status: string;
}

const validationSchema = object().shape({
  name: validator.careerProspectItemName,
  description: validator.description,
  status: validator.status,
})

export const CreateCareerProspectItem = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addCareerProspectItemMutation = useMutation({
    mutationFn: createOrUpdateCareerProspectItem,
  });

  const handleAddCareerProspectItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CareerProspectItemPayload> = {
      id: 0,
      careerProspectId: Number(id),
      title: values.name,
      description: values.description,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await addCareerProspectItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-career-prospect-id"],
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
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={
        {
          name: "",
          description: "",
          status: "",
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) => {
        handleAddCareerProspectItem(values, resetForm);
      }}
      validationSchema={validationSchema}
      enableReinitialize
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
              isLoading={addCareerProspectItemMutation.isPending}
              disabled={addCareerProspectItemMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const EditCareerProspectItem = ({
  item,
  handleClose,
}: {
  item: CareerProspectItem;
  handleClose: () => void;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const editCareerProspectItemMutation = useMutation({
    mutationFn: createOrUpdateCareerProspectItem,
  });

  const handleEditCareerProspectItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CareerProspectItemPayload> = {
      id: item?.id,
      careerProspectId: Number(id),
      title: values.name,
      description: values.description,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await editCareerProspectItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-career-prospect-id"],
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
      <option>Inactive</option>
    </>
  );

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";

  return (
    <Formik
      initialValues={
        {
          name: item?.title ?? "",
          description: item?.description,
          status: initialStatus,
        } as SetupInit
      }
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        handleEditCareerProspectItem(values, resetForm);
      }}
      validationSchema={validationSchema}
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
              isLoading={editCareerProspectItemMutation.isPending}
              disabled={editCareerProspectItemMutation.isPending}
              text="Update"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
