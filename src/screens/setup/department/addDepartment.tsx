import Input from "../../../custom/input/input";

const AddDepartment = () => {
  return (
    <section className="fields">
      <Input
        name="departmentName"
        placeholder="Input Department Name "
        label="Department Name"
      />
    </section>
  );
};

export default AddDepartment;
