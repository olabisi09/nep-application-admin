import { Form, Formik, FormikValues } from "formik";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateCareerProspect,
  getAllPrograms,
} from "../../../requests";
import { App, Spin } from "antd";
import { Button, Editor } from "../../../custom";

const AddCareerProspects = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: CareerProspect;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-program"],
    queryFn: getAllPrograms,
  });

  const programmeData = data?.data ?? [];

  const programmeOptions = programmeData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const careerProspectMutation = useMutation({
    mutationKey: ["create-career-prospect"],
    mutationFn: createOrUpdateCareerProspect,
  });

  const handleCreateUpdateCareerProspect = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CommonPayload> = {
      id: item.id || 0,
      readMoreId: values.programName,
      description: values.description,
      activeStatus: values.status === "Active" ? true : false,
    };

    try {
      await careerProspectMutation.mutateAsync(payload, {
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-career-prospect"],
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

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const statusOptions = (
    <>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        programName: item?.readMoreId?.toString() ?? "",
        description: item?.description ?? "",
        status: hasRecords ? initialStatus : "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleCreateUpdateCareerProspect(values, resetForm);
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <section className="fields">
              <Select
                name="programName"
                placeholder="Select Program"
                label="Program Name"
                options={programmeOptions}
              />
              <Editor
                name="description"
                label="Description"
                onChange={(_, editor) => {
                  const data = editor.getData();
                  setFieldValue("description", data);
                }}
                initialData={item?.description ?? ''}
              />
              <Select
                name="status"
                placeholder="Select status"
                label="Status"
                options={statusOptions}
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
                  text={hasRecords ? "Update" : "Create"}
                  disabled={careerProspectMutation?.isPending}
                  isLoading={careerProspectMutation?.isPending}
                />
              </div>
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddCareerProspects;
