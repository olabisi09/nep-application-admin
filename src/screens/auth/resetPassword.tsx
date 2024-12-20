import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Info } from "../../assets/info.svg";
import Button from "../../custom/button/button";
import Input from "../../custom/input/input";
import { resetPasswordAdmin } from "../../requests";
import { routes } from "../../routes";
import { validator } from "../../utils/validator";


const ResetPassword = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token") ?? "";

  const ResetPasswordMutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: resetPasswordAdmin,
  });

  const handleResetPassword = async (values: FormikValues) => {
    // eslint-disable-next-line no-undef
    const payload: Partial<ResetPayload> = {
      password: values.newPassword,
      confirmPassword: values.confirmPassword,
      token: token,
    };

    try {
      await ResetPasswordMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          navigate(routes.auth.login);
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
    newPassword: validator.newPassword,
    confirmPassword: validator.confirmPassword,
  });
  return (
    <div>
      <h4 className="text-center">Reset Password</h4>
      <small className="text-center">Enter new password and confirm it.</small>
      <br />
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          handleResetPassword(values);
        }}
        validationSchema={validationSchema}>
        {() => {
          return (
            <Form className="fields">
              <Input
                name="newPassword"
                label="New Password"
                placeholder="Input new password"
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm new password"
              />
              <small className="flex-start">
                <span>
                  <Info />
                </span>
                Password must be more than 8 characters. Must contain <br />{" "}
                uppercase, lowercase and numbers.
              </small>
              <Button type="submit" text="Submit" />
              <Button
                disabled={ResetPasswordMutation?.isPending}
                isLoading={ResetPasswordMutation?.isPending}
                type="button"
                variant="text"
                iconBefore={<Arrow />}
                text="Back to Login"
                onClick={() => navigate(routes.auth.login)}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ResetPassword;
