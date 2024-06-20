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
        placeholder="Input Description Name "
        label="Description Name"
        type="textarea"
      />
         <Select
        name="ProgramName "
        placeholder="Select Level Name "
        label="Program Name"
      />
         <Select
        name="ProgramName "
        placeholder="Input Program Name "
        label="Program Name"
      />
    </section>
  );
};

export default AddCurriculum;
