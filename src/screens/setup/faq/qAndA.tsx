import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import Select from "../../../custom/select/select";
import { FieldArray, Form, Formik } from "formik";
import { Fragment } from "react/jsx-runtime";

const QAndA = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Formik
      initialValues={{ title: "", items: [{ question: "", answer: "" }] }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />

          <FieldArray name="items">
            {({ push }) => (
              <>
                {values.items.map((_, index) => (
                  <Fragment key={index}>
                    <Input
                      name={`items.${index}.question`}
                      label="Question"
                      placeholder="Input question"
                    />
                    <Input
                      name={`items.${index}.answer`}
                      type="textarea"
                      label="Answer"
                      placeholder="Input answer"
                    />
                  </Fragment>
                ))}
                <Button
                  variant="text"
                  iconBefore="+"
                  onClick={() => push({ question: "", answer: "" })}
                  text="Add Question/Answer"
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

export default QAndA;
