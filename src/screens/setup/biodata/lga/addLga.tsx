import Input from "../../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  StatusOptions,
  createOrUpdateLGA,
  getState,
} from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";
import Select from "../../../../custom/select/select";

interface Props {
  data?: LGA;
  handleClose: () => void;
}

const AddLga = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createLgaMutation = useMutation({
    mutationFn: createOrUpdateLGA,
    mutationKey: ["create-Lga"],
  });

  const createLgaHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<LGA> = {
      id: data?.id || 0,
      stateId: values?.stateName,
      activeStatus: values?.status === "true",
      lgaName: values?.lgaName,
    };

    try {
      await createLgaMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-lga"],
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

  const { data: stateData } = useQuery({
    queryKey: ["get-states"],
    queryFn: () => getState({}),
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: true,
  });

  const stateOptions: any =
    stateData?.data &&
    stateData?.data.length > 0 &&
    stateData?.data.map((item: any, index: number) => (
      <option value={item?.id} key={index}>
        {item?.stateName}
      </option>
    ));

  const validationSchema = Yup.object().shape({
    stateName: Yup.string().required("State is required"),
    lgaName: Yup.string().required("Lga is required"),
    status: Yup.string().required("Active Status is required"),
  });

  return (
    <Formik
      initialValues={{
        lgaName: data?.lgaName || "",
        stateName: data?.stateId || "",
        status:
          data?.activeStatus !== undefined ? String(data?.activeStatus) : "",
      }}
      onSubmit={(values, { resetForm }) => {
        createLgaHandler(values, resetForm);
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue }) => {
        return (
          <Form className="fields">
            <Select
              name="stateName"
              placeholder="Input State/Province/District Name"
              label="State/Province/District Name"
              options={stateOptions}
              onChange={(e) => setFieldValue("stateName", e.target.value)}
            />

            <Input
              name="lgaName"
              placeholder="Input LGA Name"
              label="LGA Name"
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
              onChange={(e) => setFieldValue("status", e.target.value)}
            />
            
            <div className="btn-group">
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                onClick={handleSubmit as any}
                disabled={createLgaMutation?.isPending}
                text={
                  data
                    ? createLgaMutation?.isPending
                      ? "Updating"
                      : "Update"
                    : createLgaMutation?.isPending
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

export default AddLga;
