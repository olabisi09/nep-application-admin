import { App, Descriptions, Spin } from "antd";
import Input from "../../../custom/input/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Form, Formik, FormikProvider, FormikValues, useFormik } from "formik";
import { Button } from "../../../custom";
import { useState } from "react";
import { createFaculty, editFaculty } from "../../../requests";

interface Props {
  details?: createOrUpdateFacultyPayload;
  handleClose: () => void;
}

const EditFaculty = ({ handleClose, details }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [Id, setId] = useState<number | null>(null);

  const editFacultyMutation = useMutation({ mutationFn: createFaculty });

  const validate = Yup.object().shape({
    name: Yup.string().required("Faculty name is required"),
    description: Yup.string().required("Description is required"),
    categoryCode: Yup.string().required(" Faculty Code is required"),
  });

  const handleEditFaculty = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<editFacultyPayload> = {
      name: values.name,
      description: values.description,
      categoryCode: values.categoryCode,
    };

    try {
      await editFacultyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries();
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

  const createFacultyMutation = useMutation({
    mutationFn: createFaculty,
    mutationKey: ["create-faculty"],
  });

  //   const formik = useFormik<FormikValues>({
  //     initialValues: {
  //       name: "",
  //       description: "",
  //       categoryCode: "",
  //     },
  //     onSubmit: (values, { resetForm }) => {
  //       FacultyHandler(values, resetForm);
  //     },
  //     validationSchema: validate,
  //     enableReinitialize: true,
  //   });

  const FacultyHandler = async (values: FormikValues) => {
    const payload: Partial<createOrUpdateFacultyPayload> = {
      id: values.id || 0,
      description: values.description,
      categoryCode: values.categoryCode,
      name: values.name,
    };

    try {
      await createFacultyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries();
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
              categoryCode: "",
              description:"",
      }}
      onSubmit={(values) => {
        handleEditFaculty(values);
          }}
      validationSchema={validate}
      >{() => {
              return (
                <Form className="fields">
                  <Input
                    label="Faculty Name"
                    placeholder="Input Faculty Name"
                    name="name"
                  />

                  <Input
                    label="Faculty Code"
                    placeholder="Input Faculty Code"
                    name="categoryCode"
                  />

                  <Input
                    label="Description"
                    placeholder="Description"
                    name="description"
                  />

                  <div className="btn-group">
                    <Button
                      onClick={handleClose}
                      variant="text"
                      text="Cancel"
                    />
                    <Button text="Update" type="submit" isLoading={editFacultyMutation.isPending} disabled={editFacultyMutation.isPending} />
                  </div>
                </Form>
              );
      }}
     
    </Formik>
  );
};

export default EditFaculty;
