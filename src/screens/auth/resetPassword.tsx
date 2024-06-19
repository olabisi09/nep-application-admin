import { Form, Formik } from "formik";
import Input from "../../custom/input/input";
import Button from "../../custom/button/button";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Info } from "../../assets/info.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h4 className="text-center">Reset Password</h4>
      <small className="text-center">Enter new password and confirm it.</small>
      <br />
      <Formik initialValues={{}} onSubmit={() => {}}>
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
            type="button"
            variant="text"
            iconBefore={<Arrow />}
            text="Back to Login"
            onClick={() => navigate(routes.auth.login)}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
