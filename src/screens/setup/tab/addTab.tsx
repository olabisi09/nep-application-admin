import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { createUpdateTab, StatusOptions } from "../../../requests";
import { Button, Input, Select } from "../../../custom";

const AddTab = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  
  const addTabMutation = useMutation({ mutationFn: createUpdateTab });

  const validate = Yup.object().shape({
    tabName: Yup.string().required("Tab Name is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const handleAddTab = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Tab> = {
      tabName: values?.tabName,
      isActive: values.isActive === "true",
    };

    try {
      await addTabMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-tab"] });
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
  return (
    <Formik
      initialValues={{ tabName: "", isActive: "true" }} // Default to true
      onSubmit={(values, { resetForm }) => {
        handleAddTab(values, resetForm);
      }}
      validationSchema={validate}>
      <Form className="fields">
        <Input name="tabName" label="Tab Name" placeholder="Input Tab" />
        <Select
          name="isActive"
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
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text="Create"
            isLoading={addTabMutation.isPending}
            disabled={addTabMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditTab = ({
  tab,
  handleClose,
}: {
  tab: Tab;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    tabName: Yup.string().required("Tab Name is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const editTabMutation = useMutation({ mutationFn: createUpdateTab });
  const handleEditTab = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Tab> = {
      id: tab?.id,
      tabName: values?.tabName,
      isActive: values?.isActive === "true",
    };

    try {
      await editTabMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-tab"] });
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
  return (
    <Formik
      initialValues={{
        tabName: tab?.tabName,
        isActive: tab?.isActive !== undefined ? String(tab?.isActive) : "true", // Default to true if undefined
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditTab(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize>
      <Form className="fields">
        <Input name="tabName" label="Tab" placeholder="Input Tab" />
        <Select
          name="isActive"
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
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text="Edit"
            isLoading={editTabMutation.isPending}
            disabled={editTabMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
export { AddTab, EditTab };
