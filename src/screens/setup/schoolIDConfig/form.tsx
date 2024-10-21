import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import * as Yup from "yup";
import { Select } from "../../../custom";
import { createUpdateSchoolID } from "../schoolIDConfig/request";
import { validator } from "../../../utils/validator";

const CreateSchoolID = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addSchoolIDMutation = useMutation({ mutationFn: createUpdateSchoolID });

  const validate = Yup.object().shape({
    codeName: validator.codeName,
    codeValue: validator.codeValue,
  });

  const handleAddSchoolID = async (
    values: FormikValues,
    resetForm: () => void,
    handleClose: () => void
  ) => {
    const payload: Payload = {
      codeName: values.codeName,
      value: values.codeValue,
      activeStatus: values.status === "Active" ? true : false,
    };

    try {
      await addSchoolIDMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-school-id"] });
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
      <option value="Active">Active</option>
      <option value="inactive">Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        codeName: "",
        codeValue: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddSchoolID(values, resetForm, handleClose);
      }}
      validationSchema={validate}
    >
      {() => (
        <Form className="fields">
          <Input
            name="codeName"
            label="Code Name"
            placeholder="Input code name"
          />
          <Input
            name="codeValue"
            label="Code Value"
            placeholder="Input code value"
          />

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
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
              disabled={addSchoolIDMutation?.isPending}
              isLoading={addSchoolIDMutation?.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditSchoolID = ({
  item,
  handleClose,
}: {
  item: SchoolID;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const editSchoolIDMutation = useMutation({
    mutationFn: createUpdateSchoolID,
  });

  const handleEditSchoolID = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    let payload: Payload = {
      id: item.id,
      codeName: values.codeName,
      value: values.codeValue,
      activeStatus: values.status === "Active" ? true : false,
    };

    try {
      await editSchoolIDMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-school-id"] });
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
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";

  return (
    <Formik
      initialValues={{
        codeName: item?.codeName,
        codeValue: item?.value,
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditSchoolID(values, resetForm);
      }}
      enableReinitialize={true}
    >
      {() => (
        <Form className="fields">
          <Input
            name="codeName"
            label="Code Name"
            placeholder="Input code name"
          />
          <Input
            name="codeValue"
            label="Code Value"
            placeholder="Input code value"
          />

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
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
              isLoading={editSchoolIDMutation.isPending}
              disabled={editSchoolIDMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { CreateSchoolID, EditSchoolID };
