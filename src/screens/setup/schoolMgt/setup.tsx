import { useState } from "react";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik } from "formik";
import Select from "../../../custom/select/select";

const SetupSchoolMgt = ({ handleClose }: { handleClose: () => void }) => {
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
    <Formik initialValues={{}} onSubmit={() => {}}>
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
        <Select name="status" label="Status" placeholder="Active" />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button text="Create" />
        </div>
      </Form>
    </Formik>
  );
};

export default SetupSchoolMgt;
