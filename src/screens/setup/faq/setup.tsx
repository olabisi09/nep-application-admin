import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import Select from "../../../custom/select/select";
import { Form, Formik } from "formik";

const SetupFaq = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Select name="status" label="Status" placeholder="Active" />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button text="Create" />
        </div>
      </Form>
    </Formik>
  );
};

export default SetupFaq;
