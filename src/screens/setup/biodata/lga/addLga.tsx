import Input from "../../../../custom/input/input";
import Select from "../../../../custom/select/select";

const AddLga = () => {
  return (
    <section className="fields">
         <Select
        name="CountryName "
        placeholder="Input Country Name"
        label="Country Name"
      />  
       <Select
        name="StateName "
        placeholder="Input State Name"
        label="State Name"
      />  
       <Input
        name="LgaName "
        placeholder="Input LGA Name"
        label="LGA Name"
      />  
    </section>
  );
};

export default AddLga;
