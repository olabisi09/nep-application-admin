import { App } from "antd";
import Input from "../../../custom/input/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Button, Select } from "../../../custom";
import { editFaculty, StatusOptions } from "../../../requests";

interface Props {
  handleClose: () => void;
  record: FacultyResponse;
}

const EditFaculty = ({ handleClose, record }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Faculty name is required"),
    description: Yup.string().required("Description is required"),
    categoryCode: Yup.string().required(" Faculty Code is required"),
  });

  const editFacultyMutation = useMutation({
    mutationFn: editFaculty,
  });

  const facultyHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<createOrUpdateFacultyPayload> = {
      id: record?.id,
      description: values.description,
      categoryCode: values.categoryCode,
      name: values.name,
    };

    try {
      await editFacultyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["get-faculty"] });
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
        name: record?.name ?? "",
        description: record?.description ?? "",
        categoryCode: record?.categoryCode ?? "",
      }}
      onSubmit={(values, { resetForm }) => {
        facultyHandler(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form className="fields">
            <Input
              label="Faculty Name"
              placeholder="Input Faculty Name"
              name="name"
            />

            <Input
              label="Faculty Code"
              placeholder="Input Faculty Code"
              name="categoryCode"
            />

            <Input
              label="Description"
              placeholder="Description"
              name="description"
            />
            <Select
              name="activeStatus"
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
                text={
                  editFacultyMutation.isPending ? "Submitting..." : "Submit"
                }
                type="submit"
                isLoading={editFacultyMutation?.isPending}
                disabled={editFacultyMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditFaculty;