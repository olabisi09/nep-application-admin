import Input from "../../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateGender} from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";

interface Props {
  data?: Gender;
  handleClose: () => void;
}

const AddGender = ({ handleClose,data }:Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const CreateGenderMutation = useMutation({
    mutationFn: createOrUpdateGender,
    mutationKey: ["create-gender"],
  });

  const CreateGenderHandler = async (values: FormikValues) => {
    const payload: Partial<Gender> = {
      genderName: values.genderName,
      activeStatus:true,
   
    };

    try {
      await CreateGenderMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-gender"],
          });
          handleClose()
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    genderName: Yup.string().required("Gender is required"),
  });

 return (
    <Formik
      initialValues={{
        genderName: data?.genderName || "",
      }}
      onSubmit={(values) => {
        CreateGenderHandler(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form className="fields">
          <Input
            name="genderName"
            placeholder="Input Gender"
            label="Gender"
          />
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button
              onClick={handleSubmit as any} 
              disabled={CreateGenderMutation?.isPending}
              text={
                CreateGenderMutation?.isPending ? "Creating..." : "Create"
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddGender ;