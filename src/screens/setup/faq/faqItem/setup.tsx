/* eslint-disable no-undef */
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";

import { Select } from "../../../../custom";
import Button from "../../../../custom/button/button";
import Input from "../../../../custom/input/input";
import { StatusOptions, createOrUpdateFaqItem } from "../../../../requests";

export const CreateFaqItem = ({
  faqId,
  handleClose,
  refetch,
}: {
  faqId: string;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const { notification } = App.useApp();

  const createFaqItemMutation = useMutation({
    mutationFn: createOrUpdateFaqItem,
  });

  const handleAddFaqItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<FaqItem> = {
      question: values.question,
      answer: values.answer,
      faqId: parseInt(faqId),
      activeStatus: values.status === "true",
    };

    try {
      await createFaqItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          handleClose();
          refetch();
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
      initialValues={{ question: "", answer: "", status: "" }}
      onSubmit={(values, { resetForm }) => {
        handleAddFaqItem(values, resetForm);
      }}
    >
      <Form className="fields">
        <Input
          name={`question`}
          label="Question"
          placeholder="Input question"
        />
        <Input
          name={`answer`}
          type="textarea"
          label="Answer"
          placeholder="Input answer"
        />
        <Select
          name="status"
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
          <Button
            onClick={handleClose}
            type="button"
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            text="Create"
            isLoading={createFaqItemMutation.isPending}
            disabled={createFaqItemMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

export const EditFaqItem = ({
  item,
  handleClose,
  refetch,
}: {
  item: FaqItem;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const { notification } = App.useApp();
  const editFaqItemMutation = useMutation({
    mutationFn: createOrUpdateFaqItem,
  });

  const handleUpdateFaqItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<FaqItem> = {
      id: item.id,
      question: values.question,
      answer: values.answer,
      faqId: item.faqId,
      activeStatus: values.status === "true",
    };

    try {
      await editFaqItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          handleClose();
          refetch();
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
      initialValues={{ question: item?.question, answer: item?.answer, status: item?.activeStatus }}
      onSubmit={(values, { resetForm }) => {
        handleUpdateFaqItem(values, resetForm);
      }}
      enableReinitialize
    >
      <Form className="fields">
        <Input
          name={`question`}
          label="Question"
          placeholder="Input question"
        />
        <Input
          name={`answer`}
          type="textarea"
          label="Answer"
          placeholder="Input answer"
        />
        <Select
          name="status"
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
          <Button
            onClick={handleClose}
            type="button"
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            text="Update"
            isLoading={editFaqItemMutation.isPending}
            disabled={editFaqItemMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
