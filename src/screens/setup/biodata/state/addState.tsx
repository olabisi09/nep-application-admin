import Input from "../../../../custom/input/input";
import Select from "../../../../custom/select/select";

const AddState = () => {
  return (
    <section className="fields">
        <Select
        name="CountryName "
        placeholder="Input Country Name"
        label="Country Name"
      />  
       <Input
        name="StateName "
        placeholder="Input State Name"
        label="State Name"
      />  
    </section>
  );
};

export default AddState;
