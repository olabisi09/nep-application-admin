import { FieldArray, Form, Formik } from "formik";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";

const FormSetup = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        inputs: [""],
      }}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="fields">
          <Input name="name" label="Form Name" placeholder="Input name" />
          <FieldArray name="inputs">
            {({ push }) => (
              <>
                {values.inputs.length > 0 &&
                  values.inputs.map((_, index) => (
                    <Input
                      name={`inputs.${index}`}
                      label={`Input Field ${index + 1}`}
                      placeholder="Input Field Name"
                    />
                  ))}
                <Button
                  onClick={() => push("")}
                  variant="text"
                  iconBefore="+"
                  text="Add Input Field"
                />
              </>
            )}
          </FieldArray>
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormSetup;
