import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddProgram = () => {
  return (
    <section className="fields">
      <Select
        name="facultyName"
        placeholder="Input Faculty Name "
        label="Faculty Name"
      />
      <Select
        name="departmentName"
        placeholder="Input Department Name "
        label="Department Name"
      />
      <Input name="programName" label="Program Name" placeholder="Select Program Name" />
    </section>
  );
};

export default AddProgram;
