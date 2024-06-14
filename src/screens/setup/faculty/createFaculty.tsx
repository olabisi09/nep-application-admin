import {FormikProvider, FormikValues, useFormik } from "formik";
import styles from "./styles.module.scss"
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";


const CreateFaculty = () => {
        const formik = useFormik<FormikValues>({
          initialValues:  {
            facultyName: "",
          },
          onSubmit: (data, { resetForm }) => {},
          // validationSchema: validationRules,
        });
  return (
    <main className={styles.modalMain}>
      <section>
        <p className={styles.modalHeading}>Faculty Setup</p>
       
        <div className={styles.line}></div>
      </section>

      <section>
      <FormikProvider value={formik}>
        <form>
          <Input
            name="facultyName"
            placeholder="Input Faculty Name "
            label="Faculty Name"
          />
     
        
        </form>
      </FormikProvider>

      
      </section>

      <section className={styles.btnSection}>
        <div className={styles.btnWidth}>
          <Button
            disabled={false}
            className={styles.whiteBtn}
            text={"Cancel"}
          />
          <Button
            disabled={false}
            text={"Create"}
          />
        </div>
      </section>
    </main>
  );
};

export default CreateFaculty;
