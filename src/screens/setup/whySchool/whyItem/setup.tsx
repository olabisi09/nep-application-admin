import { Select, Input, Button, Upload } from "../../../../custom";
import { Form, Formik, FormikValues } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createUpdateWhyItem } from "../../../../requests";
import { App } from "antd";
import { ReactComponent as Image } from "../../../../assets/image.svg";

export const SetupWhyItem = ({
  whyItem,
  whyId,
  handleClose,
  refetch,
}: {
  whyItem?: WhyItem;
  whyId: number | string;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const { notification } = App.useApp();
  const createUpdateWhyItemMutation = useMutation({
    mutationFn: createUpdateWhyItem,
  });

  const handleCreateUpdateWhyItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = new FormData();
    payload.append("Id", whyItem?.id ? `${whyItem?.id}` : "0");
    payload.append("WhyId", `${whyId}`);
    payload.append("Name", values.title);
    payload.append("Description", values.description);
    payload.append("Icon", values.image || "");
    if (whyItem?.iconUrl) {
      payload.append("IconUrl", whyItem.iconUrl);
    }
    payload.append(
      "ActiveStatus",
      values.activeStatus === "Active" ? "true" : "false"
    );
    payload.append("IsDeleted", "false");

    try {
      await createUpdateWhyItemMutation.mutateAsync(payload, {
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

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        image: null,
        title: whyItem?.name || "",
        description: whyItem?.description || "",
        status: whyItem?.activeStatus ? "Active" : "Inactive",
      }}
      onSubmit={(values, { resetForm }) => {
        handleCreateUpdateWhyItem(values, resetForm);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input
            type="textarea"
            name="description"
            label="Description"
            placeholder="Input description"
          />
          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{(values.image as File)?.name}</span>
              <Button
                onClick={() => setFieldValue("image", null)}
                variant="text"
                text="x"
              />
            </div>
          ) : (
            <Upload
              name="image"
              label="Icon Upload"
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  setFieldValue("image", file[0]);
                }
              }}
            />
          )}
          <Select
            name="status"
            label="Status"
            placeholder="Active"
            options={statusOptions}
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
              text={!!whyItem ? "Update" : "Create"}
              isLoading={createUpdateWhyItemMutation.isPending}
              disabled={createUpdateWhyItemMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
