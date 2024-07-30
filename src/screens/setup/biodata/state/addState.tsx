import Input from "../../../../custom/input/input";
import Select from "../../../../custom/select/select";

const AddState = () => {

  
  const StatusOptions = [
    {
      name: "Approved",
      value:true
    },
    {
      name: "Rejected",
      value:false
    },
    {
      name: "Pending",
      value:' '
    },
  ];

  const statusData: any =
    StatusOptions &&
    StatusOptions?.length > 0 &&
    StatusOptions?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));



  return (
    <section className="fields">
        <Select
        name="CountryName "
        placeholder="Input Country Name"
        label="Country Name"
        options={statusData}
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
