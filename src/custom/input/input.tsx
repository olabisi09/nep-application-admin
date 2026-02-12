import { ChangeEventHandler, FC, useState } from 'react';

import classNames from 'classnames';
import { Field, FieldProps } from 'formik';

import styles from './input.module.scss';

import { ReactComponent as ShowIcon } from '../../assets/eye.svg';
import { ReactComponent as HideIcon } from '../../assets/eye-crossed.svg';

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

const Input: FC<ComponentProps> = (props) => {
  const { name, label, disabled, type = 'text', placeholder, isRow, asterisk = false, min } = props;

  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPasswordHandle = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const inputType = type === 'password' ? (isShowPassword ? 'text' : 'password') : type;

  let inputClassName = isRow ? styles.input : styles.inputTwo;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={isRow ? styles.loginContainer : ''}>
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
            {type !== 'textarea' ? (
              <>
                <input
                  {...field}
                  type={inputType}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={classNames(styles.customInput, inputClassName)}
                  min={min}
                />
                {type === 'password' && (
                  <button type="button" className={styles.showToggle} onClick={showPasswordHandle}>
                    {isShowPassword ? (
                      <HideIcon width="1.5rem" height="1.5rem" />
                    ) : (
                      <ShowIcon width="1.5rem" height="1.5rem" />
                    )}
                  </button>
                )}
              </>
            ) : (
              <textarea className={styles.inputTwo} {...field} placeholder={placeholder} rows={3} />
            )}
          </div>

          {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
        </div>
      )}
    </Field>
  );
};

export default Input;
