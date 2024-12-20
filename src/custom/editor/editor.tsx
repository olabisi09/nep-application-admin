import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Mention,
  Paragraph,
  Underline,
  Undo,
} from "ckeditor5";
import { ErrorMessage } from "formik";
const Editor = ({
  name,
  label,
  onChange,
  initialData,
  onReady
}: {
  label: string;
  name?: string;
  onChange?: (...args: any[]) => void;
  initialData?: string;
  onReady?: ((editor: ClassicEditor) => void) | undefined;
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
              "underline",
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
            Underline,
          ],
          initialData: initialData,
        }}
        onReady={onReady}
        onChange={onChange}
        data={initialData}
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
