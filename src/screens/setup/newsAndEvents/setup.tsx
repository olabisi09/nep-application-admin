import { Form, Formik } from "formik";
import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";

interface Init {
  title: string;
  description: string;
  image: File | null;
  status: string;
}

const SocialMediaSetup = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Formik
      initialValues={
        {
          title: "",
          description: "",
          image: null,
          status: "",
        } as Init
      }
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input
            name="title"
            type="textarea"
            label="Description"
            placeholder="Input description"
          />
          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{values.image?.name}</span>
              <Button
                onClick={() => setFieldValue("image", null)}
                variant="text"
                text="x"
              />
            </div>
          ) : (
            <Upload
              name="image"
              label="Image"
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  setFieldValue("image", file[0]);
                }
              }}
            />
          )}
          <Select name="status" label="Status" placeholder="Select status" />
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SocialMediaSetup;
