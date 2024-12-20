import { FC, ReactNode } from "react";

import { Dropdown } from "antd";

import styles from "./styles.module.scss";

type Placement =
  | "bottomLeft"
  | "bottom"
  | "bottomRight"
  | "topLeft"
  | "top"
  | "topRight";

interface DropdownProps {
  dropdownButton: ReactNode;
  dropdownContent?: ReactNode;
  placement?: Placement;
}

const CustomDropdown: FC<DropdownProps> = ({
  dropdownButton,
  dropdownContent,
  placement,
}) => {
  return (
    <Dropdown
      dropdownRender={() => (
        <div className={styles.dropdown}>{dropdownContent}</div>
      )}
      trigger={["click"]}
      placement={placement}
    >
      {dropdownButton}
    </Dropdown>
  );
};

export default CustomDropdown;
