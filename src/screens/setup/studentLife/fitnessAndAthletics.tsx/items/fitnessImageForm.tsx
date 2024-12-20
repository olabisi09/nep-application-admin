/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { useParams } from "react-router-dom";
import { object } from "yup";

import { ReactComponent as Image } from "../../../../../assets/image.svg";
import { Button, Select, Upload } from "../../../../../custom";
import { createOrUpdateFitnessImage } from "../../../../../requests";
import { validator } from "../../../../../utils/validator";

interface SetupInit {
  name: string;
  image: File | null;
}

const FitnessImageForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: Partial<FitnessImage>;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const fitnessImageMutation = useMutation({
    mutationFn: createOrUpdateFitnessImage,
  });

  const fitnessId = id?.toString() ?? "";
  const itemId = item?.id?.toString() ?? "0";

  const handleAddUpdateFitnessImage = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();
    formData.append("Id", itemId);
    formData.append("fitnessId", fitnessId);
    formData.append("Image", values.image);
    formData.append(
      "ActiveStatus",
      values.status === "Active" ? String(true) : String(false)
    );

    try {
      await fitnessImageMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-fitness-image"] });
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

  const validateSetup = object().shape({
    status: validator.status,
    // image: validator.file,
  });

  const statusOptions = (
    <>
      <option value={""}>-- select an option --</option>
      <option value="Active"> Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const initialStatus = item?.activeStatus
    ? "Active"
    : item?.activeStatus === false
    ? "Inactive"
    : "";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          name: "",
          image: null,
          status: initialStatus,
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) =>
        handleAddUpdateFitnessImage(values, resetForm)
      }
      validationSchema={validateSetup}
    >
      {({ setFieldValue, values }) => (
        <Form className="fields">
          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{values.image.name}</span>
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

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
          />

          <div className="btn-group">
            <Button
              type="button"
              onClick={handleClose}
              variant="text"
              text="Cancel"
            />
            
            <Button
              type="submit"
              isLoading={fitnessImageMutation.isPending}
              disabled={fitnessImageMutation.isPending}
              text={hasRecords ? "Update" : "Create"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FitnessImageForm;
