import { Form, Formik, FormikValues } from "formik";
import Input from "../../../custom/input/input";
import { FC } from "react";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateModeOfStudy } from "../../../requests";
import { Button, Select } from "../../../custom";

interface ComponentProps {
  record?: ModeOfStudy;
  handleClose: () => void;
}

const AddModeOfStudy: FC<ComponentProps> = ({ record, handleClose }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createUpdateModeOfStudyMutation = useMutation({
    mutationFn: createOrUpdateModeOfStudy,
    mutationKey: ["create-update-mode-of-study"],
  });

  const createUpdateModeOfStudyHandler = async (values: FormikValues) => {
    const payload = {
      id: record?.id || 0,
      name: values.modeOfStudy,
      activeStatus: values.status === "Active" ? true : false,
      isDeleted: false,
    };

    try {
      await createUpdateModeOfStudyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
          });

          queryClient.refetchQueries({
            queryKey: ["get-mode-of-study"],
          });
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error?.response.data?.message || error?.response?.data?.title,
      });
    }
  };

  const statusOptions = (
    <>
      <option value={""}>-- select an option --</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const hasRecord = Object.keys(record ?? {})?.length > 0;

  return (
    <Formik
      initialValues={{ modeOfStudy: record?.name ?? "" }}
      onSubmit={(values) => {
        createUpdateModeOfStudyHandler(values);
      }}
    >
      {({ setFieldValue, values }) => {
        console.log(values);

        return (
          <Form>
            <section className="fields">
              <Input
                name="modeOfStudy"
                label="Mode of Study Name"
                placeholder="Input Mode of Study Name"
                value={record?.name ?? values.modeOfStudy}
                onChange={(e) => {
                  console.log("log");
                  setFieldValue("modeOfStudy", e.target.value);
                }}
              />

              <Select
                name="status"
                label="Status"
                placeholder="Select status"
                options={statusOptions}
              />
            </section>

            <div className="btn-group">
              <Button onClick={handleClose} variant="text" text="Cancel" />

              <Button
                text={hasRecord ? "Update" : "Create"}
                disabled={createUpdateModeOfStudyMutation.isPending}
                isLoading={createUpdateModeOfStudyMutation.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddModeOfStudy;
