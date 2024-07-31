import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";

const AddAccreditation = () => {
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
        
    </section>
  );
};

export default AddAccreditation;
