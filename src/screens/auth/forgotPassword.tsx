import { Form, Formik } from "formik";
import Input from "../../custom/input/input";
import Button from "../../custom/button/button";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4 className="text-center">Forgot Password?</h4>
      <small className="text-center">
        Input your email address &amp; we&apos;ll send you reset instructions.
      </small>
      <br />
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form className="fields">
          <Input name="email" label="Email Address" placeholder="Input email" />
          <Button type="submit" text="Submit" />
          <Button
            onClick={() => navigate("/")}
            type="button"
            variant="text"
            iconBefore={<Arrow />}
            text="Back to Login"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
