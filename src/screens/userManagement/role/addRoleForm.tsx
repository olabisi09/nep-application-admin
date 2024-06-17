import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddRoleForm = () => {
  return (
    <section className="fields">
      <Input name="role" label="Role" placeholder="Input role" />
      <Select name="status" label="Status" placeholder="Select status" />
    </section>
  );
};

export default AddRoleForm;
