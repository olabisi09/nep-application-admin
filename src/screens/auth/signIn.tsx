import { Form, Formik } from "formik";
import Input from "../../custom/input/input";
import Button from "../../custom/button/button";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const SignIn = () => {
  return (
    <div>
      <h4 className="text-center">Welcome!</h4>
      <small className="text-center">Log in to your account</small>
      <br />
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form className="fields">
          <Input name="email" label="Email Address" placeholder="Input email" />
          <Input
            name="password"
            label="Password"
            placeholder="Input password"
          />
          <div className="space-between">
            <Checkbox>Remember me</Checkbox>
            <Link to={routes.auth.forgotPassword}>Forgot Password?</Link>
          </div>
          <Button type="submit" text="Login" />
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
