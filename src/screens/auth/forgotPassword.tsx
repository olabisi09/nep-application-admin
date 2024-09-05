import { Form, Formik, FormikValues } from "formik";
import Input from "../../custom/input/input";
import Button from "../../custom/button/button";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordAdmin } from "../../requests";
import { validator } from "../../utils/validator";
import * as Yup from "yup";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { notification } = App.useApp();

  const ForgotPasswordMutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: ForgotPasswordAdmin,
  });

  const handleForgotPassword = async (values: FormikValues) => {
    const payload: ForgotPayload = {
      email: values.email,
    };

    try {
      await ForgotPasswordMutation.mutateAsync(payload, {
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
    email: validator.email,
  });

  return (
    <div>
      <h4 className="text-center">Forgot Password?</h4>
      <small className="text-center">
        Input your email address &amp; we&apos;ll send you reset instructions.
      </small>
      <br />
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          handleForgotPassword(values);
        }}
        validationSchema={validationSchema}>
        {(props) => {
          return (
            <Form className="fields">
              <Input
                name="email"
                label="Email Address"
                placeholder="Input email"
              />
              <Button
                type="submit"
                text="Submit"
                disabled={ForgotPasswordMutation?.isPending}
                isLoading={ForgotPasswordMutation?.isPending}
              />
              <Button
                onClick={() => navigate("/")}
                type="button"
                variant="text"
                iconBefore={<Arrow />}
                text="Back to Login"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
