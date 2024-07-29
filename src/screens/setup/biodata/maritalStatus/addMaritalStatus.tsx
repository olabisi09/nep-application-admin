import Input from "../../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateMaritalStatus } from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";


const AddMarital = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const CreateMaritalStatusMutation = useMutation({
    mutationFn: createOrUpdateMaritalStatus,
    mutationKey: ["create-marital-status"],
  });

  const CreateMaritalStatusHandler = async (values: FormikValues) => {
    const payload: Partial<MaritalStatus> = {
      statusName: values.MaritalName,
   
    };

    try {
      await CreateMaritalStatusMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
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
    MaritalName: Yup.string().required("Marital Name is required"),
  });

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        CreateMaritalStatusHandler(values);
      }}
    >
      <Form className="fields">
        <Input
          name="MaritalName "
          placeholder="Input Marital Name"
          label="Marital Name"
        />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            disabled={CreateMaritalStatusMutation?.isPending}
            text={
              CreateMaritalStatusMutation?.isPending ? "Creating..." : "Create"
            }
          />
        </div>
      </Form>
    </Formik>
  );
};

// const EditMarital = ({ handleClose }: { handleClose: () => void }) => {
//   return (
//     <Formik initialValues={{}} onSubmit={() => {}}>
//       <Form className="fields">
//         <Input
//           name="MaritalName "
//           placeholder="Input Marital Name"
//           label="Marital Name"
//         />
//         <div className="btn-group">
//           <Button onClick={handleClose} variant="text" text="Cancel" />
//           <Button text="Create" />
//         </div>
//       </Form>
//     </Formik>
//   );
// };
export { AddMarital };
