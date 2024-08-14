import { useState } from "react";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import Upload from "../../../custom/upload/upload";

const AddTestimonial = () => {
    const [upload, setUpload] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      if (file) {
        setUpload(file[0]);
      }
    };
    const clearFile = () => {
      setUpload(null);
    };
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
    {upload ? (
        <div className="small-gap">
          <Image />
          <span>{upload.name}</span>
          <Button onClick={clearFile} variant="text" text="x" />
        </div>
      ) : (
        <Upload name="image" label="Image" onChange={handleFileChange} />
      )}


  </section>
  );
};

export default AddTestimonial;
