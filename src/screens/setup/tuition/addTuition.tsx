import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddTuition = () => {
  return (
    <section className="fields">
      <Select
        name="programName"
        placeholder="Select Program Name "
        label="Program Name"
      />
      <Input
        name="amount"
        label="Amount"
        placeholder="Input Amount"
      />

      <Select name="Status" placeholder="Active" label="Status" />
    </section>
  );
};

export default AddTuition;
