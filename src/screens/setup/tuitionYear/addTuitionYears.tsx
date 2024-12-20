/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Button, Editor, Select } from "../../../custom";
import { StatusOptions, createUpdateTuitionYear } from "../../../requests";

const validationSchema = Yup.object().shape({
  tuition: Yup.string().required("Tuition is required"),
  level: Yup.string().required("Level is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
});

const AddTuitionYears = ({
  handleClose,
  levelItem,
  tuitionFeeItem,
}: {
  handleClose: () => void;
  programItem: Program[];
  levelItem: Level[];
  tuitionFeeItem: Tuition[];
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addTuitionYearMutation = useMutation({
    mutationFn: createUpdateTuitionYear,
  });

  const handleAddTuitionYear = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<TuitionYear> = {
      tuitionId: values?.tuition,
      levelId: values?.level,
      feeDescription: values?.description,
      isActive: values?.status === "true",
    };

    try {
      await addTuitionYearMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["getAll-TuitionYear"] });
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
        tuition: "",
        level: "",
        description: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) =>
        handleAddTuitionYear(values, resetForm)
      }
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Select
            name="tuition"
            placeholder="Select Tuition Program Name"
            label="Tuition Program Name"
            options={
              <>
                {tuitionFeeItem?.map((option: Tuition) => (
                  <option key={option?.id} value={option?.id}>
                    {option?.programName}
                  </option>
                ))}
              </>
            }
          />

          <Select
            name="level"
            placeholder="Select Level"
            label="Level"
            options={
              <>
                {levelItem?.map((option: Level) => (
                  <option key={option?.id} value={option.id}>
                    {option.levelName}
                  </option>
                ))}
              </>
            }
          />

          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
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
              isLoading={addTuitionYearMutation.isPending}
              disabled={addTuitionYearMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTuitionYears;

export const EditTuitionYears = ({
  item,
  levelItem,
  tuitionFeeItem,
  handleClose,
}: {
  item: TuitionYear;
  programItem: Program[];
  levelItem: Level[];
  tuitionFeeItem: Tuition[];
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const editTuitionYearMutation = useMutation({
    mutationFn: createUpdateTuitionYear,
  });

  const handleEditTuitionYear = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<TuitionYear> = {
      id: item?.id,
      tuitionId: values?.tuition,
      levelId: values?.level,
      feeDescription: values?.description,
      isActive: values?.status === "true",
    };

    try {
      await editTuitionYearMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["getAll-TuitionYear"] });
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
        tuition: item?.tuitionId,
        level: item?.levelId,
        description: item?.feeDescription,
        status: String(item?.isActive),
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) =>
        handleEditTuitionYear(values, resetForm)
      }
      enableReinitialize
    >
      {({ setFieldValue }) => {
        return (
          <Form className="fields">
            <Select
              name="tuition"
              placeholder="Select Tuition"
              label="Tuition Program Name"
              options={
                <>
                  {tuitionFeeItem?.map((option: Tuition) => (
                    <option key={option?.id} value={option?.id}>
                      {option?.programName}
                    </option>
                  ))}
                </>
              }
            />

            <Select
              name="level"
              placeholder="Select Level"
              label="Level"
              options={
                <>
                  {levelItem?.map((option: Level) => (
                    <option key={option.id} value={option.id}>
                      {option?.levelName}
                    </option>
                  ))}
                </>
              }
            />

            <Editor
              name="description"
              label="Description"
              onChange={(_, editor) => {
                const data = editor.getData();
                setFieldValue("description", data);
              }}
              initialData={item?.feeDescription ?? ""}
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
                isLoading={editTuitionYearMutation?.isPending}
                disabled={editTuitionYearMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
