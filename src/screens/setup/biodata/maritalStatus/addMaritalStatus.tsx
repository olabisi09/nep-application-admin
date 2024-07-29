import Input from "../../../../custom/input/input";
import { Form, Formik, FormikProvider, FormikValues, useFormik } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateMaritalStatus } from "../../../../requests";
import * as Yup from "yup";

const AddMarital = ({ handleClose }: { handleClose: () => void }) => {
  const queryClient = useQueryClient();

  const CreateMaritalStatusMutation = useMutation({
    mutationFn: createOrUpdateMaritalStatus,
    mutationKey: ["create-marital-status"],
  });

  const CreateMaritalStatusHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const maritalStatusPayload: MaritalStatus = {
      statusName: values?.MaritalName,
    };
    try {
      await CreateMaritalStatusMutation.mutateAsync(maritalStatusPayload, {
        onSuccess: () => {
          // showNotification({
          //   message: "Marital Status Added successfully",
          //   type: "success",
          // });
          console.log('success')
          queryClient.refetchQueries({ queryKey: ["get-marital-status"] });
          handleClose();
        },
      });
    } catch (error: any) {
      // showNotification({
      //   message: error?.response?.data.Message || error.message || "Failed",
      //   type: "error",
      // });
    }
  };

  const validationSchema = Yup.object().shape({
    MaritalName: Yup.string().required("Marital Name is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      MaritalName: "",
    },
    onSubmit: (values, { resetForm }) => {
      CreateMaritalStatusHandler(values, resetForm);
    },
    validationSchema: validationSchema,
  });
  return (
    <FormikProvider value={formik} >
      <Form className="fields">
        <Input
          name="MaritalName "
          placeholder="Input Marital Name"
          label="Marital Name"
        />
        <div className="btn-group">
          <Button  onClick={handleClose} variant="text" text="Cancel" />
          <Button disabled={CreateMaritalStatusMutation?.isPending} text={CreateMaritalStatusMutation?.isPending ? 'Creating...' : 'Create'}/>
        </div>
      </Form>
    </FormikProvider>
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
