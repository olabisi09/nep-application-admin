import Input from "../../../../custom/input/input";

const AddCountry = () => {
  return (
    <section className="fields">
       <Input
        name="CountryName "
        placeholder="Input Country Name"
        label="Country Name"
      />  
    </section>
  );
};

export default AddCountry;
