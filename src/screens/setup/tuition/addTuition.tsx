import { Form, Formik, FormikValues } from "formik";
import { Button, Select } from "../../../custom";
import Input from "../../../custom/input/input";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { createUpdateTuition, StatusOptions } from "../../../requests";


const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  readmoreId: Yup.string().required("Program is required"),
  status: Yup.string().required("Status is required"),
});

const AddTuition = ({handleClose, programItem}: {handleClose: () => void, programItem: Program[]}) => {
  const {notification} = App.useApp();
  const queryClient = useQueryClient();
  const addTuitionMutation = useMutation({ mutationFn: createUpdateTuition});

 

  const handleAddTuition = async  (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Tuition> = {
      description: values?.description,
      readmoreId: values?.readmoreId,
      activeStatus: values?.status === "true",
    };

    try {
      await addTuitionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message
          });
          queryClient.refetchQueries({ queryKey: ["getAll-tuition"]});
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
  }

  return (
    <Formik
    initialValues={{
      description: "",
      readmoreId: "",
      status: "",
    }}
    onSubmit={(values, {resetForm}) => handleAddTuition(values, resetForm)}
    validationSchema={validationSchema}
  >
    <Form className="fields">
    <Input
      name="description"
      placeholder="Input Description "
      label="Description"
    />

    <Select
      name="readmoreId"
      placeholder="Select Program"
      label="program"
      options={
        <>
          {programItem?.map((option: Program) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </>
      }
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
        onClick={handleClose}
        variant="text"
        text="Cancel"
      />

      <Button
        type="submit"
        text="Create"
        isLoading={addTuitionMutation.isPending}
        disabled={addTuitionMutation.isPending}
      />

    </div>
  </Form>
  </Formik>
  );
};

export default AddTuition;


export const EditTuition = ({ item, programItem, handleClose,}: {  item: Tuition; programItem: Program[]; handleClose: () => void;}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const editTuitionMutation = useMutation({
    mutationFn: createUpdateTuition,
  });

    const handleEditTuition = async (values: FormikValues, resetForm: () => void) => {
      const payload: Partial<Tuition> = {
        id: item?.id,
        description: values?.description,
        readmoreId: values?.readmoreId,
        activeStatus: values?.status === "true",
      };

      try {
        await editTuitionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["getAll-tuition"] });
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
        id: item?.id,
        description: item?.description,
        readmoreId: item?.readmoreId,
        status: item?.activeStatus,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {resetForm}) => handleEditTuition(values, resetForm)}
      enableReinitialize
    >
      <Form className="fields">

        <Input
          name="description"
          placeholder="Input Description "
          label="Description"
        />

        <Select
          name="readmoreId"
          placeholder="Select Program"
          label="program"
          options={
            <>
              {programItem?.map((option: Program) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
            </>
          }
        />

        <Select
          name="status"
          placeholder="Select Status"
          label="Status"
          options={
            <>
              {StatusOptions.map((option: any) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </>
           }
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
            text="Update"
            isLoading={editTuitionMutation?.isPending}
            disabled={editTuitionMutation?.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

