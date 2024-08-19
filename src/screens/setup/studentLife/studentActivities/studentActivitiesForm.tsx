import { FieldArray, Form, Formik, FormikValues } from "formik";
import { Button, Input, Upload } from "../../../../custom";
import { Fragment } from "react/jsx-runtime";
import { ReactComponent as Image } from "../../../../assets/image.svg";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateStudentActivities } from "../../../../requests";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
  imageUrl: any;
}

type SetupWithActivity = {
  activities: { title: string; description: string; imageUrl: File | null }[];
} & SetupInit;

const StudentActivitiesForm = ({
  handleClose, item
}: {
  handleClose: () => void;
  item: Partial<StudentActivity>
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const studentActivitiesMutation = useMutation({
    mutationFn: createOrUpdateStudentActivities,
  });

  const handleAddUpdateStudentActivities = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    values.activities.forEach((item: any, index: number) => {
      formData.append(`StudentActivityDetails[${index}].title`, item.title);
      formData.append(
        `StudentActivityDetails[${index}].description`,
        item.description
      );
      formData.append(`StudentActivityDetails[${index}].image`, item.imageUrl);
    });

    try {
      await studentActivitiesMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-student-activities"] });
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

  return (
    <Formik
      initialValues={
        {
          title: item.title ?? "",
          description: item.description ?? "",
          activities: [
            {
              title: "",
              description: "",
              imageUrl: null,
            },
          ],
        } as SetupWithActivity
      }
      onSubmit={(values, { resetForm }) =>
        handleAddUpdateStudentActivities(values, resetForm)
      }
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          {/* <Input name="name" label="Name" placeholder="Input name" /> */}
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
                      name={`activities.${index}.title`}
                      label={`Activity Title ${index + 1}`}
                      placeholder="Activity Title"
                    />
                    <Input
                      name={`activities.${index}.description`}
                      type="textarea"
                      label={`Activity Description ${index + 1}`}
                      placeholder="Activity description"
                    />

                    {values.activities[index].imageUrl ? (
                      <div className="small-gap">
                        <Image />
                        <span>{values.activities[index].imageUrl?.name}</span>
                        <Button
                          onClick={() =>
                            setFieldValue(`activities.${index}.imageUrl`, null)
                          }
                          variant="text"
                          text="x"
                        />
                      </div>
                    ) : (
                      <Upload
                        name={`activities.${index}.imageUrl`}
                        label="Image"
                        onChange={(e) => {
                          const file = e.target.files;
                          if (file) {
                            console.log(file[0]);
                            setFieldValue(
                              `activities.${index}.imageUrl`,
                              file[0]
                            );
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
            <Button
              type="submit"
              text="Create"
              isLoading={studentActivitiesMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StudentActivitiesForm;
