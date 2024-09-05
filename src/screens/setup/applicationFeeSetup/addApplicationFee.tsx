import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddApplicationFee = () => {
  return (
    <section className="fields">
    <Select
      name=" Program Name "
      placeholder="Select Program"
      label="Program Name"
    />
    
    <Input
      name="description"
      label="Description"
      placeholder="Input Description"
      type="textarea"
    />

    <Select name="Status" placeholder="Active" label="Status" />
  </section>
  );
};

export default AddApplicationFee;
