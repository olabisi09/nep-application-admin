import { Form, Formik } from "formik";
import { Button, Input, Upload } from "../../../../custom";
import { ReactComponent as Image } from "../../../../assets/image.svg";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
}

const Overview = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          image: null,
        } as SetupInit
      }
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input name="name" label="Name" placeholder="Input name" />
          <Input
            name="description"
            type="textarea"
            label="Description"
            placeholder="Input description"
          />
          {values.image?.name ? (
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
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Overview
