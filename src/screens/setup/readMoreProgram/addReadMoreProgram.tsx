import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddReadMoreProgram = () => {
  return (
    <section className="fields">
      <Select
        name="facultyName"
        placeholder="Input Faculty Name "
        label="Faculty Name"
      />
      <Input
        name="description"
        label="Description"
        placeholder="Input Description"
        type="textarea"
      />
      <Input
        name="Duration"
        label="Duration (Months)"
        placeholder="Input Duration in months"
      />
      <Select name="Session" placeholder="Select Session" label="Session" />
      <Select name="Status" placeholder="Active" label="Status" />
    </section>
  );
};

export default AddReadMoreProgram;
