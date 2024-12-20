import { ReactComponent as Loader } from "../../assets/loader.svg";

import styles from "./spinner.module.scss";

const Spinner = () => {
  return <Loader className={styles.loader} />;
};

export default Spinner;
