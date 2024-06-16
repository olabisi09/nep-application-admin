import styles from "./dashboardLayout.module.scss";
import { ReactComponent as Menu } from "../../assets/menu.svg";

const Header = ({ handleOpenSidebar }: { handleOpenSidebar: () => void }) => {
  return (
    <header className={styles.header}>
      <section className={styles.headerMenuGroup}>
        <button onClick={handleOpenSidebar} className={styles.menuBtn}>
          <Menu />
        </button>
      </section>
    </header>
  );
};

export default Header;
