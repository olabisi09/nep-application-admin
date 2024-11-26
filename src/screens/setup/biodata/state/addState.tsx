import Input from "../../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  StatusOptions,
  createOrUpdateState,
  getCountry,
} from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";
import Select from "../../../../custom/select/select";

interface Props {
  data?: State;
  handleClose: () => void;
}

const AddState = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createStateMutation = useMutation({
    mutationFn: createOrUpdateState,
    mutationKey: ["create-state"],
  });

  const createStateHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<State> = {
      id: data?.id || 0,
      stateName: values.stateName,
      activeStatus: values?.status === "true",
      countryId: values?.countryId,
    };

    try {
      await createStateMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-state"],
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

  const { data: country } = useQuery({
    queryKey: ["get-country"],
    queryFn: () => getCountry({}),
  });

  const countryData = country?.data as Country[];

  const countryOptions: any =
    countryData &&
    countryData?.length > 0 &&
    countryData?.map((item: any, index: number) => (
      <option value={item?.id} key={index}>
        {item?.countryName}
      </option>
    ));

  const validationSchema = Yup.object().shape({
    countryId: Yup.string().required("country is required"),
    stateName: Yup.string().required("State is required"),
    status: Yup.string().required("Active Status is required"),
  });

  return (
    <Formik
      initialValues={{
        countryId: data?.countryId || "",
        stateName: data?.stateName || "",
        status:
          data?.activeStatus !== undefined
            ? String(data?.activeStatus)
            : "true",
      }}
      onSubmit={(values, { resetForm }) => {
        createStateHandler(values, resetForm);
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Form className="fields">
            <Select
              name="countryId"
              placeholder="Input Country Name"
              label="Country Name"
              options={countryOptions}
            />

            <Input
              name="stateName"
              placeholder="Input State/Province/District Name"
              label="State/Province/District Name"
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
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                onClick={handleSubmit as any}
                disabled={createStateMutation?.isPending}
                text={
                  data
                    ? createStateMutation?.isPending
                      ? "Updating"
                      : "Update"
                    : createStateMutation?.isPending
                    ? "Creating"
                    : "Create"
                }
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddState;
