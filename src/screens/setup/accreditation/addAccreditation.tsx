import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "../../../custom/select/select";
import { createOrUpdateAccreditation, getAllPrograms } from "../../../requests";
import { Form, Formik, FormikValues } from "formik";
import { FC } from "react";
import { Button, Editor } from "../../../custom";
import { App, Spin } from "antd";
import * as Yup from "yup";
import { validator } from "../../../utils/validator";

interface ComponentProps {
  record: AccreditationData;
  handleClose: () => void;
}

const AddAccreditation: FC<ComponentProps> = ({ record, handleClose }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  console.log(record);

  const createUpdateAccreditationMutation = useMutation({
    mutationFn: createOrUpdateAccreditation,
    mutationKey: ["create-update-accreditation"],
  });

  const StatusOptions = [
    {
      value: true,
      label: "Active",
    },
    {
      value: false,
      label: "Inactive",
    },
  ];

  const updateAccreditationHandler = async (values: FormikValues) => {
    const payload: Partial<AccreditationType> = {
      id: record?.id || 0,
      description: values.description,
      readMoreId: values.programName,
      activeStatus: values?.status === "true",
    };

    try {
      await createUpdateAccreditationMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-all-accreditation"],
          });
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

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["get-programs"],
    queryFn: getAllPrograms,
    retry: 1,
  });

  const programData = data?.data ?? [];

  const programOptions = programData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const validationSchema = Yup.object().shape({
    programName: validator.programName,
    status: validator.status,
    description: validator.title,
  });

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const hasRecord = Object.keys(record)?.length > 0;

  return (
    <Formik
      initialValues={{
        programName: record?.readMoreId?.toString() ?? "",
        description: record?.description || "",
        status:
          record?.activeStatus !== undefined
            ? String(record?.activeStatus)
            : "", // Initialize with string
      }}
      onSubmit={(values) => {
        updateAccreditationHandler(values);
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <section className="fields">
              <Select
                name="programName"
                placeholder="Input Program Name "
                label="Program Name"
                options={programOptions}
              />

              <Editor
                name="description"
                label="Description"
                onChange={(_, record) => {
                  const data = record.getData();
                  props.setFieldValue("description", data);
                }}
                initialData={record?.description ?? ""}
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
                  variant="text"
                  text="Cancel"
                  onClick={handleClose}
                />

                <Button
                  type="submit"
                  disabled={createUpdateAccreditationMutation.isPending}
                  isLoading={createUpdateAccreditationMutation.isPending}
                  text={hasRecord ? "Update" : "Create"}
                />
              </div>
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddAccreditation;
