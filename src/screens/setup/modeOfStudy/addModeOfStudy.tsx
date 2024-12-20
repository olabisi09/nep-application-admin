/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { StatusOptions, createOrUpdateModeOfStudy } from "../../../requests";



const AddModeOfStudy = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addModeOfStudyMutation = useMutation({
    mutationFn: createOrUpdateModeOfStudy,
  });

  const validate = Yup.object().shape({
    name: Yup.string().required("Mode of study Name is required"),
    activeStatus: Yup.string().required("Status is required"),
  });

  const handleAddModeOfStudy = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<ModeOfStudy> = {
      name: values?.name,
      activeStatus: values?.activeStatus === "true",
    };

    try {
      await addModeOfStudyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["get-mode-of-study"] });

          resetForm();
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

  return (
    <Formik
      initialValues={{ name: "", activeStatus: "" }}
      onSubmit={(values, { resetForm }) => {
        handleAddModeOfStudy(values, resetForm);
      }}
      enableReinitialize
      validationSchema={validate}
    >
      <Form className="fields">
        <Input
          name="name"
          label="Mode of Study Name"
          placeholder="Input Mode of Study Name"
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
            text="Create"
            isLoading={addModeOfStudyMutation.isPending}
            disabled={addModeOfStudyMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditModeOfStudy = ({
  modeOfStudy,
  handleClose,
}: {
  modeOfStudy: ModeOfStudy;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const editModeOfStudyMutation = useMutation({
    mutationFn: createOrUpdateModeOfStudy,
  });

  const validate = Yup.object().shape({
    name: Yup.string().required("Mode of study Name is required"),
    activeStatus: Yup.string().required("Status is required"),
  });

  const handleEditModeOfStudy = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<ModeOfStudy> = {
      id: modeOfStudy.id,
      name: values?.name,
      activeStatus: values?.activeStatus === 'true',
    };

    try {
      await editModeOfStudyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-mode-of-study"] });
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

  const initialStatus = modeOfStudy?.activeStatus;

  return (
    <Formik
      initialValues={{ name: modeOfStudy?.name, activeStatus: String(initialStatus) }}
      onSubmit={(values, { resetForm }) => {
        handleEditModeOfStudy(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="fields">
            <Input
              name="name"
              label="Mode of Study Name"
              placeholder="Input Mode of Study Name"
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
                text="Update"
                isLoading={editModeOfStudyMutation.isPending}
                disabled={editModeOfStudyMutation.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddModeOfStudy, EditModeOfStudy };
