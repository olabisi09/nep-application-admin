import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import {
  createUpdateDisplayTab,
  getAllAcademicSession,
  getAllApplicationBatch,
  getAllTab,
  StatusOptions,
} from "../../../requests";
import { Button, Input, Select } from "../../../custom";
import { validator } from "../../../utils/validator";
import { getProgramTypes } from "../programType/request";

const AddDisplayTab = ({
  displayTab,
  handleClose,
}: {
  displayTab: DisplayTab;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      { queryKey: ["get-application-batch"], queryFn: getAllApplicationBatch },
      { queryKey: ["get-all-session"], queryFn: getAllAcademicSession },
      { queryKey: ["get-all-tab"], queryFn: getAllTab },
      { queryKey: ["get-program-types"], queryFn: getProgramTypes },
    ],
  });

  const batchTypeQuery = queries[0];
  const sessionTypeQuery = queries[1];
  const tabTypeQuery = queries[2];
  const programTypeQuery = queries[3];

  const { data: batchType } = batchTypeQuery;
  const { data: sessionType } = sessionTypeQuery;
  const { data: tabType } = tabTypeQuery;
  const { data: programType } = programTypeQuery;

  const batchTypeData = batchType?.data ?? [];
  const sessionTypeData = sessionType?.data ?? [];
  const tabTypeData = tabType?.data ?? [];
  const programTypeData = programType?.data ?? [];

  const addDisplayTabMutation = useMutation({
    mutationFn: createUpdateDisplayTab,
  });

  const validate = Yup.object().shape({
<<<<<<< HEAD
    tabNumber: Yup.string().required("Tab Number is required"),
    batchName: Yup.string().required("Batch Name is required"),
    sessionId: Yup.string().required("Session is required"),
    tabName: Yup.string().required("Tap Name is required"),
    isActive: Yup.string().required("Status is required"),
=======
    tabName: validator.tabName,
    tabNumber: validator.tabNumber,
    batchName: validator.applicationBatch,
    sessionId: validator.session,
    isActive: validator.status,
>>>>>>> 6eb9263ade4d77af162876b923b9c7396e706d9f
  });

  const handleAddDisplayTab = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<DisplayTab> = {
<<<<<<< HEAD
      id: values?.id,
=======
      id: displayTab?.id ?? 0,
      tabId: values.tabName,
>>>>>>> 6eb9263ade4d77af162876b923b9c7396e706d9f
      tabNumber: values?.tabNumber,
      batchName: values?.batchName,
      sessionId: values?.sessionId,
      programTypeId: values?.programType,
      isActive: values.isActive === "true",
    };

    try {
      await addDisplayTabMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-displayTab"] });
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

  const batchTypesOptions = batchTypeData?.map((item) => (
    <option key={item?.id} value={item?.batchName}>
      {item?.batchName}
    </option>
  ));

  const sessionTypesOptions = sessionTypeData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const tabTypesOptions = tabTypeData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.tabName}
    </option>
  ));

  const programTypesOptions = programTypeData
    ?.filter((item) => item.activeStatus === true)
    ?.map((item) => (
      <option key={item?.id} value={item?.id}>
        {item?.name}
      </option>
    ));

  const initialStatus = displayTab?.isActive;
  const hasRecord = Object.keys(displayTab)?.length > 0;

  return (
    <Formik
      initialValues={{
        tabNumber: displayTab?.tabNumber ?? "",
        batchName: displayTab?.batchName ?? "",
        sessionId: displayTab?.sessionId ?? "",
        tabName: displayTab?.tabId ?? "",
        programType: displayTab?.programTypeId ?? "",
        isActive: initialStatus,
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddDisplayTab(values, resetForm);
      }}
<<<<<<< HEAD
      validationSchema={validate}>
      <Form className="fields">
        <Input
          name="tabNumber"
          label="Tab Number"
          placeholder="Input Tab Number"
        />

        <Select
          name="batchName"
          placeholder="Select Batch Name"
          label="Batch Name"
          options={batchTypesOptions}
        />
        <Select
          name="sessionId"
          placeholder="Select Session"
          label="Session"
          options={sessionTypesOptions}
        />

        <Select
          name="tabName"
          placeholder="Select Tab Name"
          label="Tab Name"
          options={tabTypesOptions}
        />

        <Select
          name="isActive"
          placeholder="Select Status"
          label="Status"
          options={
            <>
              {StatusOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          }
        />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text="Create"
            isLoading={addDisplayTabMutation.isPending}
            disabled={addDisplayTabMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditDisplayTab = ({
  displayTab,
  handleClose,
}: {
  displayTab: DisplayTab;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["get-application-batch"],
        queryFn: getAllApplicationBatch,
      },
      { queryKey: ["get-all-session"], queryFn: getAllAcademicSession },
      { queryKey: ["get-all-tab"], queryFn: getAllTab },
    ],
  });

  const batchTypeQuery = queries[0];
  const sessionTypeQuery = queries[1];
  const tabTypeQuery = queries[2];

  const { data: batchType } = batchTypeQuery;
  const { data: sessionType } = sessionTypeQuery;
  const { data: tabType } = tabTypeQuery;

  const batchTypeData = batchType?.data ?? [];
  const sessionTypeData = sessionType?.data ?? [];
  const tabTypeData = tabType?.data ?? [];

  const validate = Yup.object().shape({
    tabNumber: Yup.string().required("Tab Number is required"),
    batchName: Yup.string().required("Batch Name is required"),
    sessionId: Yup.string().required("Session is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const editDisplayTabMutation = useMutation({
    mutationFn: createUpdateDisplayTab,
  });
  const handleEditDisplayTab = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<DisplayTab> = {
      id: displayTab?.id,
      tabNumber: values.tabNumber,
      sessionId: values.sessionId,
      isActive: values?.isActive === "true",
    };

    try {
      await editDisplayTabMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-displayTab"] });
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

  const batchTypesOptions = batchTypeData?.map((item) => (
    <option key={item?.id} value={item?.batchName}>
      {item?.batchName}
    </option>
  ));

  const sessionTypesOptions = sessionTypeData?.map((item) => (
    <option key={item?.id} value={item?.name}>
      {item?.name}
    </option>
  ));

  const tabTypesOptions = tabTypeData?.map((item) => (
    <option key={item?.id} value={item?.tabName}>
      {item?.tabName}
    </option>
  ));
  return (
    <Formik
      initialValues={{
        tabNumber: displayTab?.tabNumber,
        batchName: displayTab?.batchName,
        sessionId: displayTab?.sessionId,
        tabName: displayTab?.tabId,
        isActive:
          displayTab?.isActive !== undefined
            ? String(displayTab?.isActive)
            : "true", // Default to true if undefined
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditDisplayTab(values, resetForm);
      }}
=======
>>>>>>> 6eb9263ade4d77af162876b923b9c7396e706d9f
      validationSchema={validate}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="fields">
            <Input
              name="tabNumber"
              type="number"
              label="Tab Number"
              placeholder="Input Tab Number"
            />

            <Select
              name="batchName"
              placeholder="Select Batch Name"
              label="Batch Name"
              options={batchTypesOptions}
            />
            <Select
              name="sessionId"
              placeholder="Select Session"
              label="Session"
              options={sessionTypesOptions}
            />

            <Select
              name="tabName"
              placeholder="Select Tab Name"
              label="Tab Name"
              options={tabTypesOptions}
            />

            <Select
              name="programType"
              placeholder="Select a program type"
              label="Program Type"
              options={programTypesOptions}
            />

<<<<<<< HEAD
        <Select
          name="isActive"
          placeholder="Select Status"
          label="Status"
          options={
            <>
              {StatusOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          }
        />

        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text="Edit"
            isLoading={editDisplayTabMutation.isPending}
            disabled={editDisplayTabMutation.isPending}
          />
        </div>
      </Form>
=======
            <Select
              name="isActive"
              placeholder="Select Status"
              label="Status"
              options={
                <>
                  {StatusOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </>
              }
            />

            <div className="btn-group">
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                text={hasRecord ? "Update" : "Create"}
                isLoading={addDisplayTabMutation.isPending}
                disabled={addDisplayTabMutation.isPending}
              />
            </div>
          </Form>
        );
      }}
>>>>>>> 6eb9263ade4d77af162876b923b9c7396e706d9f
    </Formik>
  );
};

// const EditDisplayTab = ({
//   displayTab,
//   handleClose,
// }: {
//   displayTab: DisplayTab;
//   handleClose: () => void;
// }) => {
//   const { notification } = App.useApp();
//   const queryClient = useQueryClient();

//   const validate = Yup.object().shape({
//     tabNUmber: Yup.string().required("Tab Number is required"),
//     isActive: Yup.string().required("Status is required"),
//   });

//   const editDisplayTabMutation = useMutation({
//     mutationFn: createUpdateDisplayTab,
//   });

//   const handleEditDisplayTab = async (
//     values: FormikValues,
//     resetForm: () => void
//   ) => {
//     const payload: Partial<DisplayTab> = {
//       id: displayTab?.id,
//       tabNumber: values.tabNumber,
//       isActive: values?.isActive === "true",
//     };

//     try {
//       await editDisplayTabMutation.mutateAsync(payload, {
//         onSuccess: (data) => {
//           notification.success({
//             message: "Success",
//             description: data?.message,
//           });
//           queryClient.refetchQueries({ queryKey: ["get-tab"] });
//           handleClose();
//           resetForm();
//         },
//       });
//     } catch (error: any) {
//       notification.error({
//         message: "Error",
//         description: error?.response?.data?.message,
//       });
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         tabNumber: displayTab?.tabNumber,
//         batchName: displayTab?.batchName,
//         sessionId: displayTab?.sessionId,
//         tabName: displayTab?.tabId,
//         isActive:
//           displayTab?.isActive !== undefined
//             ? String(displayTab?.isActive)
//             : "true", // Default to true if undefined
//       }}
//       onSubmit={(values, { resetForm }) => {
//         handleEditDisplayTab(values, resetForm);
//       }}
//       validationSchema={validate}
//       enableReinitialize
//     >
//       <Form className="fields">
//         <Input
//           name="tabNumber"
//           label="Tab Number"
//           placeholder="Input Tab Number"
//         />

//         <Select
//           name="batchName"
//           placeholder="Select Batch Name"
//           label="Batch Name"
//           options={batchTypesOptions}
//         />

//         <Select
//           name="sessionId"
//           placeholder="Select Session"
//           label="Session"
//           options={sessionTypesOptions}
//         />

//         <Select
//           name="tabName"
//           placeholder="Select Tab Name"
//           label="Tab Name"
//           options={tabTypesOptions}
//         />

//         <div className="btn-group">
//           <Button onClick={handleClose} variant="text" text="Cancel" />
//           <Button
//             text="Edit"
//             isLoading={editDisplayTabMutation.isPending}
//             disabled={editDisplayTabMutation.isPending}
//           />
//         </div>
//       </Form>
//     </Formik>
//   );
// };
export { AddDisplayTab };
