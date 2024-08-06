import { useQuery } from "@tanstack/react-query";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { getAllPrograms } from "../../../requests";
import { Form, Formik } from "formik";
import { FC } from "react";
import { Button } from "../../../custom";

interface ComponentProps {
  record: AccreditationType;
}

const AddAccreditation: FC<ComponentProps> = ({ record }) => {
  const { data, error, isError } = useQuery({
    queryKey: ["get-programs"],
    queryFn: getAllPrograms,
    retry: 1,
  });

  const programData = data?.data ?? [];

  const programOptions = programData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  return (
    <Formik
      initialValues={{
        programName: record?.program?.toString() ?? "",
        description: record?.description || "",
      }}
      onSubmit={() => {}}>
      {(props) => {
        return (
          <Form>
            <section className="fields">
              <Select
                name="programName"
                placeholder="Input Program Name "
                label="Program Name"
                options={programOptions}
              />
              <Input
                name="description"
                placeholder="Input Description"
                label="Description Name"
                type="textarea"
              />

              <div className="btn-group">
                <Button variant="text" text="Cancel" />
                <Button
                  text={Object.keys(record).length > 0 ? "Update" : "Create"}
                />
              </div>
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddAccreditation;
