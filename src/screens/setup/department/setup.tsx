import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProgram,
  StatusOptions,
  updateDepartment,
  updateProgram,
} from "../../../requests";
import { App } from "antd";
import * as Yup from "yup";
import { Select } from "../../../custom";

const validate = Yup.object().shape({
  name: Yup.string().required("Department name is required"),
  code: Yup.string().required("Department code is required"),
  faculty: Yup.string().required("Faculty is required"),
});

const CreateDepartment = ({
  handleClose,
  faculties,
}: {
  handleClose: () => void;
  faculties: Category[];
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addDepartmentMutation = useMutation({ mutationFn: createProgram });

  const facultyOptions =
    faculties &&
    faculties.map((item) => (
      <option value={item.categoryCode}>{item.name}</option>
    ));

  const handleAddDepartment = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: DepartmentPayload = {
      name: values.name,
      categoryCode: values.faculty,
      code: values.code,
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
        code: "",
        faculty: "",
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
          name="code"
          label="Department code"
          placeholder="Input department code"
        />
        <Select
          name="faculty"
          label="Faculty"
          placeholder="Select faculty"
          options={facultyOptions}
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
  item: Program;
  handleClose: () => void;
  faculties: Category[];
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const editDepartmentMutation = useMutation({
    mutationFn: updateProgram,
  });

  const facultyOptions =
    faculties &&
    faculties?.map((item) => (
      <option value={item?.categoryCode}>{item?.name}</option>
    ));

  const handleEditDepartment = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: DepartmentPayload = {
      id: item?.id,
      name: values.name,
      categoryCode: values.faculty,
      code: values.code,
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

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";

  return (
    <Formik
      initialValues={{
        name: item?.name,
        code: item?.code,
        faculty: item?.categoryCode,
        activeStatus: initialStatus,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditDepartment(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize={true}
    >
      <Form className="fields">
        <Input
          name="name"
          label="Department name"
          placeholder="Input department name"
        />
        <Input
          name="code"
          label="Department Code"
          placeholder="Input department code"
        />
        <Select
          name="faculty"
          label="Faculty"
          placeholder="Select faculty"
          options={facultyOptions}
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
