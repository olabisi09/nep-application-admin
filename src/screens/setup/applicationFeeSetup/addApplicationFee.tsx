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
  getAllFeeSetup,
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

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getAll-Fee-Setup"],
    queryFn: getAllFeeSetup,
  });

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
            queryKey: ["getAll-Fee-Setup"],
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
      validationSchema={validationSchema}>
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
                  text="Create"
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

export const EditApplicationFee = ({
  item,
  handleClose,
}: {
  item: ApplicationFee;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const editApplicationFeeMutation = useMutation({
    mutationFn: createOrUpdateApplicationFee,
  });

  const handleEditApplication = async (values: FormikValues) => {
    const payload: Partial<ApplicationFee> = {
      programId: item?.programId,
      modeOfStudyId: item?.modeOfStudyId,
      amount: item?.amount,
    };

    try {
      await editApplicationFeeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["getAll-Fee-Setup"] });
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
        programName: item?.programId,
        ModeOfStudy: item?.modeOfStudyId,
        amount: item?.amount,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleEditApplication(values)}
      enableReinitialize>
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
              text="Update"
              disabled={editApplicationFeeMutation?.isPending}
              isLoading={editApplicationFeeMutation?.isPending}
            />
          </div>
        </section>
      </Form>
    </Formik>
  );
};
