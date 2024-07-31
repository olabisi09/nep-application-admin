import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddTuitionYears = () => {
  return (
    <section className="fields">
      <Select
        name="programName"
        placeholder="Select Program Name "
        label="Program Name"
      />
       <Input
        name="description"
        label="Description"
        placeholder="Input Description"
        type="textarea"
      />
      <Select
        name="Level"
        label="Level"
        placeholder="Select Level"
      />

      <Select name="Status" placeholder="Active" label="Status" />
    </section>
  );
};

export default AddTuitionYears;
