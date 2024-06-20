import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddLevel = () => {
  return (
    <section className="fields">
   
      <Input
        name="LevelName"
        label="Level Name"
        placeholder="Input Level Name"
      />

      <Select name="Status" placeholder="Active" label="Status" />
    </section>
  );
};

export default AddLevel;
