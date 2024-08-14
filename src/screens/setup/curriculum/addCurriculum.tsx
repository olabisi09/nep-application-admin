import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddCurriculum = () => {
  return (
    <section className="fields">
      <Select
        name="ProgramName "
        placeholder="Input Program Name "
        label="Program Name"
      />
       <Input
        name="Description "
        placeholder="Input Description"
        label="Description Name"
        type="textarea"
      />
         <Select
        name="level "
        placeholder="Select Level"
        label="Level"
      />
         <Select
        name="status "
        placeholder="Select Status"
        label="Status"
      />
    </section>
  );
};

export default AddCurriculum;
