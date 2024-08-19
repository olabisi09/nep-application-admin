import { Form, Formik, FormikValues } from "formik";
import { Button, Input, Select } from "../../../../custom";
import { createOrUpdateFitnessAthletics } from "../../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import * as Yup from "yup";
import { validator } from "../../../../utils/validator";

const FitnessAndAthletics = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: Setup;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addFitnessAthleticsMutation = useMutation({
    mutationFn: createOrUpdateFitnessAthletics,
  });

  const handleAddFitnessAthletics = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await addFitnessAthleticsMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-student-life"] });
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

  const handleEditFitnessAthletics = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      id: item.id,
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active",
    };

    try {
      await addFitnessAthleticsMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-student-life"] });
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

  const statusOptions = (
    <>
      <option>-- select an option --</option>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  const validationSchema = Yup.object().shape({
    title: validator.title,
    description: validator.description,
    status: validator.status,
  });

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) =>
        handleAddFitnessAthletics(values, resetForm)
      }
      validationSchema={validationSchema}>
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          name="description"
          type="textarea"
          label="Description"
          placeholder="Input description"
        />{" "}
        <Select
          name="status"
          label="Status"
          placeholder="Select status"
          options={statusOptions}
        />
        <div className="btn-group">
          <Button
            type="button"
            onClick={handleClose}
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            isLoading={addFitnessAthleticsMutation.isPending}
            disabled={addFitnessAthleticsMutation.isPending}
            text="Create"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default FitnessAndAthletics;
