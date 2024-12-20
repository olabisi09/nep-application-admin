/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Button, Select } from "../../../custom";
import Input from "../../../custom/input/input";
import { StatusOptions, createUpdateLevel } from "../../../requests";

const validationSchema = Yup.object().shape({
  levelName: Yup.string().required("Level Name is required"),
  status: Yup.string().required("Status is required"),
});

const AddLevel = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addLevelMutation = useMutation({ mutationFn: createUpdateLevel });

  const handleAddLevel = async (
    values: FormikValues,
    resetForm: () => void,
  ) => {
    const payload: Partial<Level> = {
      levelName: values?.levelName,
      isActive: values?.status === "true",
    };
    
    try {
      await addLevelMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["getAll-level"] });
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
        levelName: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => handleAddLevel(values, resetForm)}
      validationSchema={validationSchema}
    >
      <Form className="fields">
        <Input
          name="levelName"
          placeholder="Input Level Name "
          label="Level Name"
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
            isLoading={addLevelMutation.isPending}
            disabled={addLevelMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default AddLevel;

export const EditLevel = ({
  item,
  handleClose,
}: {
  item: Level;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const editLevelMutation = useMutation({
    mutationFn: createUpdateLevel,
  });

  const handleEditLevel = async (values: FormikValues) => {
    const payload: Partial<Level> = {
      id: item?.id,
      levelName: values?.levelName,
      isActive: values?.status === "true",
    };

    try {
      await editLevelMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          
          queryClient.refetchQueries({ queryKey: ["getAll-level"] });
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
        levelName: item?.levelName,
        status: String(item?.isActive),
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleEditLevel(values)}
      enableReinitialize
    >
      <Form className="fields">
        <Input
          name="levelName"
          placeholder="Input Level Name "
          label="Level Name"
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
            text="Update"
            isLoading={editLevelMutation.isPending}
            disabled={editLevelMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
