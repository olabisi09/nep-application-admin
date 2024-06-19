import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddUserForm = () => {
  return (
    <section className="fields">
      <Input name="firstName" label="First Name" placeholder="First name" />
      <Input name="lastName" label="Last Name" placeholder="Last name" />
      <Input name="email" label="Email Address" placeholder="Email address" />
      <Select name="role" label="Role" placeholder="Select role" />
      <Select name="status" label="Status" placeholder="Select status" />
    </section>
  );
};

export default AddUserForm;
