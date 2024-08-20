import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment, updateDepartment } from "../../../requests";
import { App } from "antd";
import * as Yup from "yup";
import { Select } from "../../../custom";

const CreateDepartment = ({
  handleClose,
  faculties,
}: {
  handleClose: () => void;
  faculties: Category[];
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addDepartmentMutation = useMutation({ mutationFn: createDepartment });

  const validate = Yup.object().shape({
    name: Yup.string().required("Department name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number().required().min(1, "Faculty is required"),
  });

  const facultyOptions =
    faculties &&
    faculties.map((item) => <option value={item.id}>{item.name}</option>);

  const handleAddDepartment = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Department> = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      activeStatus: true,
      isDeleted: false,
    };

    try {
      await addDepartmentMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-department"] });
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
        name: "",
        description: "",
        categoryId: 0,
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddDepartment(values, resetForm);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input
          name="name"
          label="Department name"
          placeholder="Input department name"
        />
        <Input
          name="description"
          label="Description"
          placeholder="Input description"
        />
        <Select
          name="categoryId"
          label="Faculty"
          placeholder="Select faculty"
          options={facultyOptions}
        />
        <div className="btn-group">
          <Button
            onClick={handleClose}
            type="button"
            variant="text"
            text="Cancel"
          />
          <Button
            text="Create"
            type="submit"
            disabled={addDepartmentMutation.isPending}
            isLoading={addDepartmentMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditDepartment = ({
  item,
  handleClose,
  faculties,
}: {
  item: Department;
  handleClose: () => void;
  faculties: Category[];
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const editDepartmentMutation = useMutation({
    mutationFn: updateDepartment,
  });

  const facultyOptions =
    faculties &&
    faculties.map((item) => <option value={item.id}>{item.name}</option>);

  const handleEditDepartment = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Department> = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      id: item.id,
      activeStatus: true,
      isDeleted: false,
    };

    try {
      await editDepartmentMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-department"] });
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
        name: item?.name,
        description: item?.description,
        categoryId: item?.categoryId,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditDepartment(values, resetForm);
      }}
      enableReinitialize={true}
    >
      <Form className="fields">
        <Input
          name="name"
          label="Department name"
          placeholder="Input department name"
        />
        <Input
          name="description"
          label="Description"
          placeholder="Input description"
        />
        <Select
          name="categoryId"
          label="Faculty"
          placeholder="Select faculty"
          options={facultyOptions}
        />
        <div className="btn-group">
          <Button
            onClick={handleClose}
            type="button"
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            text="Update"
            isLoading={editDepartmentMutation.isPending}
            disabled={editDepartmentMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

export { CreateDepartment, EditDepartment };
