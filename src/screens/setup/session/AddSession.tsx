import { Form, Formik, FormikValues } from "formik";
import { Select } from "../../../custom";
import Input from "../../../custom/input/input";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateSession } from "../../../requests";
import { App } from "antd";

const AddSession = ({handleClose}: {handleClose: () => void}) => {
  const {notification} = App.useApp();
  const queryClient = useQueryClient();
  const addSessionMutation = useMutation({ mutationFn: createOrUpdateSession});


  const validate = Yup.object().shape({
    sessionName: Yup.string().required("Session Name is required"),
  });

  const handleAddSession = async (values: FormikValues) => {
    const payload: Partial<Session> = {
      name: values.sessionName,
      activeStatus: values.status,
      isDeleted: false
    };

    try {
      await addSessionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message
          });
          queryClient.refetchQueries({ queryKey: ["getAll-sessions"]});
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  }

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
    initialValues={{
      sessionName: "",
      status: "",
    }}
    onSubmit={(values) => handleAddSession(values)}
    validationSchema={validate}
  >
    <Form className="fields">
    <Input
      name="sessionName"
      placeholder="Input Session Name "
      label="Session Name"
    />

    <Select
      name="status"
      label="Status"
      placeholder="Select status"
      options={statusOptions}
    />
  </Form>
  </Formik>
  );
};

export default AddSession;
