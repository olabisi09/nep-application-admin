import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddDetails = () => {
  return (
    <section className="fields">
      <Input
        name="description"
        label="Description"
        placeholder="Input Description"
        type="textarea"
      />

      <Select name="Status" placeholder="Active" label="Status" />
      <Input
        name="sitting"
        label="No. of Sittings"
        placeholder="Input No. of Sittings"
      />
    </section>
  );
};

export default AddDetails;
