import { Form, Formik } from "formik";
import { Input, Select } from "../../../../custom";


const AddItem = () => {
  return (
    <Formik
      initialValues={{}}
      

      onSubmit={()=>{}}
    
    // validationSchema={va}
    >

      {(values)=>{

        return (
          <Form>
            <section className="fields">
              <Input name="Title" placeholder="Input Title " label="Title" />
              <Input
                name="description"
                label="Description"
                placeholder="Input Description"
                type="textarea"
              />

              <Select name="Status" placeholder="Active" label="Status" />
            </section>
          </Form>
        );
      }}
     
    </Formik>
  );
};

export default AddItem;
