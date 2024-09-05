import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { App } from "antd";
import {
  createOrUpdateApplicationFee,
  getAllModeOfStudy,
  getAllProgramsApplicationFee,
} from "../../../requests";
import { Formik, FormikValues, Form } from "formik";
import { FC } from "react";
import { Button } from "../../../custom";
import * as Yup from "yup";
import { validator } from "../../../utils/validator";

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

          queryClient.refetchQueries({
            queryKey: ["get-AllPrograms-ApplicationFee"],
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

  const queries = useQueries({
    queries: [
      {
        queryKey: ["get-AllPrograms-ApplicationFee"],
        queryFn: getAllProgramsApplicationFee,
      },
      { queryKey: ["get-AllModeOfStudy"], queryFn: getAllModeOfStudy },
    ],
  });

  const programQuery = queries[0];
  const modeQuery = queries[1];

  const programData = programQuery?.data?.data ?? [];
  const modeOfStudyData = modeQuery?.data?.data ?? [];

  const programOptions = programData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const modeOfStudyOptions = modeOfStudyData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const validationSchema = Yup.object().shape({
    programName: validator.programName,
    ModeOfStudy: validator.ModeOfStudy,
    amount: validator.amount,
  });

  return (
    <Formik
      initialValues={{
        // id: 0,
        programName: "",
        ModeOfStudy: "",
        amount: "",
      }}
      onSubmit={(values) => {
        createUpdateApplicationFeeHandler(values);
      }}
    validationSchema={validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <section className="fields">
              <Select
                name="programName"
                placeholder="Select Program"
                label="Program Name"
                options={programOptions}
              />
              <Select
                name="ModeOfStudy"
                label="Mode of Study"
                placeholder="Select Mode of Study"
                options={modeOfStudyOptions}
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
                  // text='Create'
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
