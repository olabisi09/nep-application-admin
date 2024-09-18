import React from 'react'

export const editFaculty = () => {
  return (
    <div>editFaculty</div>
  )
}


// import { App } from "antd";
// import Input from "../../../custom/input/input";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import * as Yup from "yup";
// import { Form, Formik, FormikValues } from "formik";
// import { Button } from "../../../custom";
// import { editFaculty } from "../../../requests";

// interface Props {
//   record?: createOrUpdateFacultyPayload;
//   handleClose: () => void;
// }

// const EditFaculty = ({ handleClose, record }: Props) => {
//   const { notification } = App.useApp();
//   const queryClient = useQueryClient();

//   // Define validation schema with Yup
//   const validate = Yup.object().shape({
//     name: Yup.string().required("Faculty name is required"),
//     description: Yup.string().required("Description is required"),
//     categoryCode: Yup.string().required("Faculty Code is required"),
//   });

//   // Define the mutation for updating the faculty
//   const editFacultyMutation = useMutation({
//     mutationFn: editFaculty,

//     onSuccess: (data) => {
//       notification.success({
//         message: "Success",
//         description: data?.message || "Faculty updated successfully",
//       });
//       queryClient.refetchQueries({ queryKey: ["get-faculty"] });
//       handleClose();
//     },
//     onError: (error: any) => {
//       notification.error({
//         message: "Error",
//         description: error?.response?.data?.message || "An error occurred",
//       });
//     },
//   });

//   // Handler function for form submission
//   const facultyHandler = async (values: FormikValues) => {
//     const payload: Partial<editFacultyPayload> = {
//       id: record?.id,
//       categoryCode: values.categoryCode,
//       name: values.name,
//       description: values.description,
//     };

//     // Trigger the mutation
//     await editFacultyMutation.mutateAsync(payload);
//   };

//   return (
//     <Formik
//       initialValues={{
//         id: record?.id ?? "",
//         name: record?.name ?? "",
//         description: record?.description ?? "",
//         categoryCode: record?.categoryCode ?? "",
//       }}
//       onSubmit={(values) => {
//         facultyHandler(values);
//       }}
//       validationSchema={validate}
//       enableReinitialize={true}>
//       {({ isSubmitting }) => (
//         <Form className="fields">
//           <Input
//             label="Faculty Name"
//             placeholder="Input Faculty Name"
//             name="name"
//           />

//           <Input
//             label="Faculty Code"
//             placeholder="Input Faculty Code"
//             name="categoryCode"
//           />

//           <Input
//             label="Description"
//             placeholder="Description"
//             name="description"
//           />

//           <div className="btn-group">
//             <Button onClick={handleClose} variant="text" text="Cancel" />
//             <Button
//               text={editFacultyMutation.isPending ? "Submitting..." : "Submit"}
//               type="submit"
//               isLoading={editFacultyMutation?.isPending}
//               disabled={editFacultyMutation?.isPending}
//             />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default EditFaculty;
