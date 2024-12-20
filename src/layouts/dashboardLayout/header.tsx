import { ReactComponent as Search } from "../../assets/magnifier.svg";
import { ReactComponent as Menu } from "../../assets/menu.svg";

import styles from "./dashboardLayout.module.scss";

const Header = ({ handleOpenSidebar }: { handleOpenSidebar: () => void }) => {
  return (
    <header className={styles.header}>
      <section className={styles.headerMenuGroup}>
        <button onClick={handleOpenSidebar} className={styles.menuBtn}>
          <Menu />
        </button>
        <div className={styles.search}>
          <Search />
          <input
            className={styles.headerInput}
            type="text"
            placeholder="Search"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
