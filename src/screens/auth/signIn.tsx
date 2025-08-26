import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { App, Checkbox, Spin } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../custom/button/button';
import Input from '../../custom/input/input';
import { useValidateUser } from '../../hooks/useValidateUser';
import { signInUser } from '../../requests';
import { routes } from '../../routes';
import { userAtom } from '../../utils/store';
import { validator } from '../../utils/validator';

const SignIn = () => {
  // const setUser = useSetAtom(userAtom);
  const [user, setUser] = useAtom(userAtom);

  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { isLoading } = useValidateUser();

  const signInMutation = useMutation({
    mutationKey: ['SignIn'],
    mutationFn: signInUser,
  });

  useEffect(() => {
    // if (user?.token && user?.isAdmin) {
      navigate('/about-us', { replace: true });
    // }
  }, [user?.token, user?.isAdmin, navigate]);

  const handleSignIn = async (values: FormikValues, resetForm: () => void) => {
    // eslint-disable-next-line no-undef
    const payload: SignInPayload = {
      email: values.email,
      password: values.password,
    };

    try {
      await signInMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
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

          resetForm();
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    email: validator.email,
    password: validator.password,
  });

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="formContainer">
      <h4 className="text-center">Welcome!</h4>
      <small className="text-center">Log in to your account</small>
      <br />

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { resetForm }) => {
          handleSignIn(values, resetForm);
        }}
        validationSchema={validationSchema}
        // enableReinitialize
      >
        {() => {
          return (
            <Form className="fields">
              <Input name="email" label="Email Address" placeholder="Input email" />

              <Input name="password" type="password" label="Password" placeholder="Input password" />

              <div className="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link to={routes.auth.forgotPassword}>Forgot Password?</Link>
              </div>

              <Button
                type="submit"
                text="Login"
                disabled={signInMutation?.isPending}
                isLoading={signInMutation?.isPending}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
