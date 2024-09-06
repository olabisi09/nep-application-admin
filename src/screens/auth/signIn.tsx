import { Form, Formik, FormikValues } from "formik";
import Input from "../../custom/input/input";
import Button from "../../custom/button/button";
import { App, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { validator } from "../../utils/validator";
import * as Yup from "yup";
import { useAtom, useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { SignInUser } from "../../requests";
import { userAtom } from "../../utils/store";
import { useEffect } from "react";

const SignIn = () => {
  const setUser = useSetAtom(userAtom);
  const [user] = useAtom(userAtom);

  const { notification } = App.useApp();
  const navigate = useNavigate();

  const SignInMutation = useMutation({
    mutationKey: ["SignIn"],
    mutationFn: SignInUser,
  });

  useEffect(() => {
    if (user && user?.token && user?.isAdmin === true) {
      navigate("/about-us");
    }
  }, [user]);

  // console.log(user?.isAdmin);

  const handleSignIn = async (values: FormikValues) => {
    const payload: SignInPayload = {
      email: values.email,
      password: values.password,
    };
    try {
      await SignInMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          setUser({
            token: data?.data?.token,
            isNewUser: data?.data?.isNewUser,
            applicantId: data?.data?.applicantId,
            expiration: data?.data?.expiration,
            email: data?.data?.email,
            role: data?.data?.role,
            isAdmin: data?.data?.isAdmin,
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
    password: validator.password,
  });

  return (
    <div>
      <h4 className="text-center">Welcome!</h4>
      <small className="text-center">Log in to your account</small>
      <br />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          handleSignIn(values);
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
              <Input
                name="password"
                label="Password"
                placeholder="Input password"
              />
              <div className="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link to={routes.auth.forgotPassword}>Forgot Password?</Link>
              </div>
              <Button
                type="submit"
                text="Login"
                disabled={SignInMutation?.isPending}
                isLoading={SignInMutation?.isPending}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
