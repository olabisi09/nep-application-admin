import { Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import styles from "./authLayout.module.scss";

const AuthLayout = () => {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <Logo className={styles.logo} />
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
