import { Field, FieldProps } from "formik";
import React, { ChangeEventHandler } from "react";

import styles from "./input.module.scss";
import classNames from "classnames";

interface ComponentProps {
  label: string;
  name: string;
  placeholder?: string;
  displayInput?: string;
  disabled?: boolean;
  bg?: string;
  type?: string;
  value?: string;
  asterisk?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  isRow?: boolean;
}

const Input: React.FC<ComponentProps> = (props) => {
  const {
    name,
    label,
    disabled,
    type,
    placeholder,
    isRow,
    asterisk = false,
  } = props;

  const inputType = ["password", "textarea"];

  let inputClassName: string;

  switch (true) {
    case isRow:
      inputClassName = styles.input;
      break;
    case type === inputType[0]:
      inputClassName = styles.password;
      break;
    // case type === inputType[1]:
    //   inputClassName = styles.textarea;
    //   break;
    default:
      inputClassName = styles.inputTwo;
      break;
  }

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={isRow ? styles.loginContainer : ""}>
          <label>
            {props.asterisk === true ? (
              <span>
                {props.label}
                <sup className={styles.asterisk}>*</sup>
              </span>
            ) : (
              props.label
            )}
          </label>

          {type !== inputType[1] && (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={classNames(styles.customInput, inputClassName)}
            />
          )}

          {type === inputType[1] && (
            <textarea
              className={styles.inputTwo}
              {...field}
              placeholder={placeholder}
              rows={3}
            />
          )}

          {meta.touched && meta.error && (
            <div className={styles.error}>{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default Input;
