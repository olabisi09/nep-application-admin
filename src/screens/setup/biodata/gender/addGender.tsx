import Input from "../../../../custom/input/input";

const AddGender = () => {
  return (
    <section className="fields">
       <Input
        name="GenderName "
        placeholder="Input Gender Name"
        label="Gender Name"
      />  
    </section>
  );
};

export default AddGender;
