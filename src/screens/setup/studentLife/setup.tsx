import { FieldArray, Form, Formik } from "formik";
import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import { Fragment } from "react/jsx-runtime";

interface Setup {
  title: string;
  name: string;
  description: string;
  image: File | null;
}

type SetupWithActivity = {
  activities: { activity: string; image: File | null }[];
} & Setup;

export const StudentLifeSetup = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          image: null,
        } as Setup
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

export const OverviewSetup = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          image: null,
        } as Setup
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

export const StudentActivitiesSetup = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          activities: [
            {
              activity: "",
              image: null,
            },
          ],
        } as SetupWithActivity
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
          <FieldArray name="activities">
            {({ push }) => (
              <>
                {values.activities.map((_, index) => (
                  <Fragment key={index}>
                    <Input
                      name={`activities.${index}.activity`}
                      label={`Activity ${index + 1}`}
                      placeholder="Activity description"
                    />
                    {values.activities[index].image ? (
                      <div className="small-gap">
                        <Image />
                        <span>{values.activities[index].image?.name}</span>
                        <Button
                          onClick={() =>
                            setFieldValue(`activities.${index}.image`, null)
                          }
                          variant="text"
                          text="x"
                        />
                      </div>
                    ) : (
                      <Upload
                        name={`activities.${index}.image`}
                        label="Image"
                        onChange={(e) => {
                          const file = e.target.files;
                          if (file) {
                            setFieldValue(`activities.${index}.image`, file[0]);
                          }
                        }}
                      />
                    )}
                  </Fragment>
                ))}
                <Button
                  variant="text"
                  iconBefore="+"
                  onClick={() => push({ activity: "", image: null })}
                  text="Add Activitiy & Image"
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
