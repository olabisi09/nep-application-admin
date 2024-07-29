import { useState } from "react";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createOrUpdateAboutUs } from "../../../requests";
import { App } from "antd";
import * as Yup from "yup";

const CreateAboutUs = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const [upload, setUpload] = useState<File | null>(null);
  const addAboutUsMutation = useMutation({ mutationFn: createOrUpdateAboutUs });

  const validate = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
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

  const handleAddAboutUs = async (values: FormikValues) => {
    const payload: Partial<AboutUs> = {
      title: values.title,
      description: values.description,
      image: upload,
    };

    try {
      await addAboutUsMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
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
      initialValues={{}}
      onSubmit={(values) => {
        handleAddAboutUs(values);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          type="textarea"
          name="description"
          label="Description"
          placeholder="Input description"
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
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text={addAboutUsMutation.isPending ? "Creating" : "Create"}
            isLoading={addAboutUsMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditAboutUs = ({
  item,
  handleClose,
}: {
  item: AboutUs;
  handleClose: () => void;
}) => {
  const [upload, setUpload] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };
  const clearFile = () => {
    setUpload(null);
  };
  return (
    <Formik
      initialValues={{
        title: item?.title,
        description: item?.description,
        //image: upload || item?.image,
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      enableReinitialize={true}
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          type="textarea"
          name="description"
          label="Description"
          placeholder="Input description"
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
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button text="Update" />
        </div>
      </Form>
    </Formik>
  );
};

export { CreateAboutUs, EditAboutUs };
