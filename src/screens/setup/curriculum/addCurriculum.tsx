/* eslint-disable no-undef */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Spin } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Button } from "../../../custom";
import Editor from "../../../custom/editor/editor";
import Select from "../../../custom/select/select";
import {
  StatusOptions,
  createOrUpdateCurriculum,
  getAllLevel,
  getAllPrograms,
} from "../../../requests";

interface Props {
  details?: CurriculumPayload;
  handleClose: () => void;
}

const AddCurriculum = ({ handleClose, details }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    programName: Yup.string().required("Program name is required"),
    description: Yup.string().required("Description is required"),
    levelId: Yup.string().required("Level name is required"),
    activeStatus: Yup.string().required("Active status is required"),
  });

  const addCurriculumMutation = useMutation({
    mutationFn: createOrUpdateCurriculum,
    mutationKey: ["addCurriculum"],
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: () => getAllPrograms(),
  });

  const {
    data: levelsData,
    isLoading: isLevelsLoading,
    isError: isLevelsError,
    error: levelsError,
  } = useQuery({
    queryKey: ["get-all-levels"],
    queryFn: getAllLevel,
  });

  const curriculumHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CurriculumPayload> = {
      id: details?.id || 0,
      description: values.description,
      readmoreId: values.programName,
      levelId: values.levelId,
      activeStatus: values.activeStatus === "true",
    };

    try {
      await addCurriculumMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-curriculum"] });
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
        programName: details?.readmoreId || "",
        description: details?.description || "",
        levelId: details?.levelId || "",
        // readmoreId: details?.readmoreId || "",
        activeStatus: String(details?.activeStatus ?? ""),
      }}
      onSubmit={(values, { resetForm }) => {
        curriculumHandler(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Select
            name="programName"
            label="Program Name"
            placeholder="Select Program Name"
            // onChange={handleProgramChange}
            options={
              <>
                {isLoading ? (
                  <Spin />
                ) : isError ? (
                  <p>{error?.message}</p>
                ) : (
                  data &&
                  data?.data?.length > 0 &&
                  data?.data.map((option: Program) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))
                )}
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
            initialData={details?.description}
          />

          <Select
            name="levelId"
            label="Level Name"
            placeholder="Select Level Name"
            options={
              <>
                {isLevelsLoading ? (
                  <Spin />
                ) : isLevelsError ? (
                  <p>{levelsError?.message}</p>
                ) : (
                  levelsData &&
                  levelsData?.data?.length > 0 &&
                  levelsData?.data.map((option: Level) => (
                    <option key={option.id} value={option.id}>
                      {option.levelName}
                    </option>
                  ))
                )}
              </>
            }
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
                addCurriculumMutation.isPending ? "Submitting..." : "Submit"
              }
              type="submit"
              isLoading={addCurriculumMutation?.isPending}
              disabled={addCurriculumMutation?.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCurriculum;