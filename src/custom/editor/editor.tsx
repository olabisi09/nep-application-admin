import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Link,
  List,
  Heading,
} from "ckeditor5";
import { ErrorMessage } from "formik";

const Editor = ({
  name,
  label,
  onChange,
}: {
  label: string;
  name?: string;
  onChange?: (...args: any[]) => void;
}) => {
  return (
    <div>
      <label>{label}</label>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              "heading",
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "link",
              "|",
              "numberedList",
              "bulletedList",
            ],
          },
          plugins: [
            Bold,
            Essentials,
            Italic,
            Mention,
            Paragraph,
            Undo,
            Link,
            List,
            Heading,
          ],
        }}
        onChange={onChange}
      />
      {name && (
        <ErrorMessage name={name}>
          {(msg) => <span className="error">{msg}</span>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default Editor;
