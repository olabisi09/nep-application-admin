/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Button, Select } from "../../../custom";
import Input from "../../../custom/input/input";
import { StatusOptions, createUpdateSession } from "../../../requests";

const validationSchema = Yup.object().shape({
  sessionName: Yup.string().required("Session Name is required"),
  status: Yup.string().required("Status is required"),
});

const AddSession = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addSessionMutation = useMutation({ mutationFn: createUpdateSession });

  const handleAddSession = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Session> = {
      name: values?.sessionName,
      activeStatus: values?.status === "true",
    };

    try {
      await addSessionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["getAll-sessions"] });

          resetForm();
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        sessionName: "",
        status: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => handleAddSession(values, resetForm)}
    >
      <Form className="fields">
        <Input
          name="sessionName"
          placeholder="Input Session Name "
          label="Session Name"
        />

        <Select
          name="status"
          placeholder="Select Status"
          label="Status"
          options={
            <>
              {StatusOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          }
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
            text="Create"
            isLoading={addSessionMutation.isPending}
            disabled={addSessionMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default AddSession;

export const EditSession = ({
  item,
  handleClose,
}: {
  item: Session;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const editSessionMutation = useMutation({
    mutationFn: createUpdateSession,
  });

  const handleEditSession = async (values: FormikValues) => {
    const payload: Partial<Session> = {
      id: item?.id,
      name: values.sessionName,
      activeStatus: values?.status === "true",
    };

    try {
      await editSessionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["getAll-sessions"] });

          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        sessionName: item?.name,
        status: String(item?.activeStatus),
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleEditSession(values)}
      enableReinitialize
    >
      <Form className="fields">
        <Input
          name="sessionName"
          placeholder="Input Session Name "
          label="Session Name"
        />

        <Select
          name="status"
          placeholder="Select Status"
          label="Status"
          options={
            <>
              {StatusOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option?.label}
                </option>
              ))}
            </>
          }
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
            text="Update"
            isLoading={editSessionMutation?.isPending}
            disabled={editSessionMutation?.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
