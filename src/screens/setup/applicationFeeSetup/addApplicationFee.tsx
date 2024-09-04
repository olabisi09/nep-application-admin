import { Form } from "react-router-dom";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { createOrUpdateApplicationFee } from "../../../requests";
import { Formik, FormikValues } from "formik";
import { FC } from "react";
import { Button } from "../../../custom";

interface ComponentProps {
  record: ApplicationFee;
  handleClose: () => void;
}

const AddApplicationFee: FC<ComponentProps> = ({ record, handleClose }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createUpdateApplicationFeeMutation = useMutation({
    mutationFn: createOrUpdateApplicationFee,
    mutationKey: ["create-update-applicationFee"],
  });

  const createUpdateApplicationFeeHandler = async (values: FormikValues) => {
    const payload: Partial<ApplicationFee> = {
      id: record?.id || 0,
      modeOfStudyId: values.ModeOfStudy,
      programId: values.programName,
      amount: values.amount,
    };

    try {
      await createUpdateApplicationFeeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
          });
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        id: 0,
        ProgramName: "",
        ModeOfStudy: "",
        amount: "",
      }}
      onSubmit={(values) => {
        createUpdateApplicationFeeHandler(values);
      }}>
      {(props) => {
        return (
          <Form>
            <section className="fields">
              <Select
                name=" ProgramName "
                placeholder="Select Program"
                label="Program Name"
              />
              <Select
                name="ModeOfStudy"
                label="Mode of Study"
                placeholder="Select Mode of Study"
              />

              <Input name="amount" placeholder="#0.00" label="Amount" />

              <div className="btn-group">
                <Button
                  type="button"
                  variant="text"
                  text="Cancel"
                  onClick={handleClose}
                />
                <Button
                  type="submit"
                  disabled={createUpdateApplicationFeeMutation.isPending}
                  isLoading={createUpdateApplicationFeeMutation.isPending}
                  text={Object.keys(record).length > 0 ? "Update" : "Create"}
                />
              </div>
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddApplicationFee;
