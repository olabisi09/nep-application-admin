import { Input, Select } from "../../../../custom";


const AddItem = () => {
  return (
    <section className="fields">
    <Input
      name="Title"
      placeholder="Input Title "
      label="Title"
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

export default AddItem;
