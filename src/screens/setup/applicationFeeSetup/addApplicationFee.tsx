import { Form } from "react-router-dom";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { Formik, FormikValues } from "formik";
import { Button } from "../../../custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { App } from "antd";
import { createOrUpdateApplicationFee } from "../../../requests";

interface ComponentProps {
  record: ApplicationFeeType;
  handleClose: () => void;
}

const AddApplicationFee: FC<ComponentProps> = ({ record, handleClose }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createUpdateApplicationFeeMutation = useMutation({
    mutationFn: createOrUpdateApplicationFee,
    mutationKey: ["create-application-fee"],
  });

  const createApplicationFeeHandler = async (values: FormikValues) => {
    const payload: Partial<ApplicationFeeType> = {
      id: 0,
      programId: values.programName,
      modeOfStudyId: values.ModeOfStudy,
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
        programName: "",
        ModeOfStudy: "",
        amount: "",
      }}
      onSubmit={(values) => {
        createApplicationFeeHandler(values);
      }}
      validationSchema>
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
                  // disabled={createUpdateAccreditationMutation.isPending}
                  // isLoading={createUpdateAccreditationMutation.isPending}
                  // text={Object.keys(record).length > 0 ? "Cancel" : "Create"}
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
