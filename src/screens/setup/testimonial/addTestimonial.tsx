/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Spin } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import Editor from "../../../custom/editor/editor";
import Select from "../../../custom/select/select";
import Upload from "../../../custom/upload/upload";
import {
  StatusOptions,
  createOrUpdateTestimonial,
  getAllPrograms,
} from "../../../requests";

const AddTestimonial = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [upload, setUpload] = useState<File | null>(null);

  const addTestimonialMutation = useMutation({
    mutationFn: createOrUpdateTestimonial,
  });

  const {
    data: programsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: () => getAllPrograms(),
  });

  const validate = Yup.object().shape({
    programName: Yup.string().required("Program is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };

  const clearFile = () => {
    setUpload(null);
  };

  const handleCreateTestimonial = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Testimonial> = {
      description: values.description,
      readMoreId: parseInt(values.programName),
      image: upload,
      activeStatus: values.status,
    };

    try {
      await addTestimonialMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-testimonials"] });

          resetForm();
          handleClose();
          clearFile();
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
      initialValues={{ programName: "", description: "", status: "" }}
      onSubmit={(values, { resetForm }) => {
        handleCreateTestimonial(values, resetForm);
      }}
      validationSchema={validate}
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Select
            name="programName"
            placeholder="Select Program Name "
            label="Program Name"
            options={
              <>
                {isLoading ? (
                  <Spin />
                ) : isError ? (
                  <p>{error?.message}</p>
                ) : (
                  programsData &&
                  programsData?.data?.length > 0 &&
                  programsData?.data.map((option: Program) => (
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
          />
          {upload ? (
            <div className="small-gap">
              <Image />
              <span>{upload.name}</span>
              <Button onClick={clearFile} variant="text" text="x" />
            </div>
          ) : (
            <Upload name="image" label="Image" onChange={handleFileChange} />
          )}
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
            <Button variant="text" text="Cancel" onClick={handleClose} />
            <Button
              text="Create"
              isLoading={addTestimonialMutation.isPending}
              disabled={addTestimonialMutation?.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditTestimonial = ({
  testimonial,
  handleClose,
}: {
  testimonial: Testimonial;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [upload, setUpload] = useState<File | null>(null);
  const editTestimonialMutation = useMutation({
    mutationFn: createOrUpdateTestimonial,
  });
  const {
    data: programsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: () => getAllPrograms(),
  });

  const validate = Yup.object().shape({
    programName: Yup.string().required("Program is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };
  const clearFile = () => {
    setUpload(null);
  };
  const handleEditTestimonial = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Testimonial> = {
      id: testimonial.id,
      description: values.description,
      readMoreId: parseInt(values.programName),
      image: upload,
      activeStatus: values.status === "true",
    };

    try {
      await editTestimonialMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          handleClose();
          queryClient.refetchQueries({ queryKey: ["get-testimonials"] });
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
        programName: testimonial?.readMoreId,
        description: testimonial?.description,
        status: String(testimonial?.activeStatus),
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditTestimonial(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Select
            name="programName"
            placeholder="Select Program Name "
            label="Program Name"
            options={
              <>
                {isLoading ? (
                  <Spin />
                ) : isError ? (
                  <p>{error?.message}</p>
                ) : (
                  programsData &&
                  programsData?.data?.length > 0 &&
                  programsData?.data.map((option: Program) => (
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
            initialData={testimonial.description}
          />
          
          {upload ? (
            <div className="small-gap">
              <Image />
              <span>{upload.name}</span>
              <Button onClick={clearFile} variant="text" text="x" />
            </div>
          ) : (
            <Upload name="image" label="Image" onChange={handleFileChange} />
          )}

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
            <Button variant="text" text="Cancel" onClick={handleClose} />
            <Button
              text="Update"
              isLoading={editTestimonialMutation.isPending}
              disabled={editTestimonialMutation?.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
export { AddTestimonial, EditTestimonial };
