import { Field, FieldProps } from "formik";
import React, { ChangeEventHandler, useState } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

interface ComponentProps {
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  asterisk?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  isRow?: boolean;
  min?: string | number | undefined;
}

const Input: React.FC<ComponentProps> = (props) => {
  const {
    name,
    label,
    disabled,
    type = "text",
    placeholder,
    isRow,
    asterisk = false,
    min,
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPasswordHandle = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const inputType =
    type === "password" ? (isShowPassword ? "text" : "password") : type;

  let inputClassName = isRow ? styles.input : styles.inputTwo;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={isRow ? styles.loginContainer : ""}>
          <label>
            {asterisk ? (
              <span>
                {label}
                <sup className={styles.asterisk}>*</sup>
              </span>
            ) : (
              label
            )}
          </label>

          <div className={styles.customInput}>
            {type !== "textarea" ? (
              <>
                <input
                  {...field}
                  type={inputType}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={classNames(styles.customInput, inputClassName)}
                  min={min}
                />
                {type === "password" && (
                  <button
                    type="button"
                    className={styles.showToggle}
                    onClick={showPasswordHandle}>
                    {isShowPassword ? "Hide" : "Show"}
                  </button>
                )}
              </>
            ) : (
              <textarea
                className={styles.inputTwo}
                {...field}
                placeholder={placeholder}
                rows={3}
              />
            )}
          </div>

          {meta.touched && meta.error && (
            <div className={styles.error}>{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default Input;
