import { Form, Formik } from "formik";
import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";

export const CreateSocialMedia = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <Formik
      initialValues={{
        name: "",
        url: "",
      }}
      onSubmit={(values) => {}}
    >
      <Form className="fields">
        <Input name="name" label="Social Media Name" placeholder="Input name" />
        <Input name="url" label="Social Media URL" placeholder="Input URL" />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button text="Create" />
        </div>
      </Form>
    </Formik>
  );
};

export const EditSocialMedia = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className="fields">
        <Input name="name" label="Social Media Name" placeholder="Input name" />
        <Input name="url" label="Social Media URL" placeholder="Input URL" />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button text="Create" />
        </div>
      </Form>
    </Formik>
  );
};
