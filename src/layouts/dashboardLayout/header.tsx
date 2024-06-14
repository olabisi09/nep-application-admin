import styles from "./dashboardLayout.module.scss";
// import avatar from "../../assets/user.png";
import { ReactComponent as Bell } from "../../assets/grid_view.svg";
import { ReactComponent as Menu } from "../../assets/grid_view.svg";
import { ReactComponent as Avatar } from "../../assets/grid_view.svg";
import { ReactComponent as SearchIcon } from "../../assets/grid_view.svg";
import { Input } from "antd";
// import { ReactComponent as ArrowDown } from "../../assets/grid_view.svg";
import { ReactComponent as Logout } from "../../assets/grid_view.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "../../custom/dropdown/dropdown";
import Button from "../../custom/button/button";
// import { logout } from "../utils/logout";

const Header = ({ handleOpenSidebar }: { handleOpenSidebar: () => void }) => {
  const navigate = useNavigate();
  // const user = useAtomValue(userData);
  // const [profile, setProfile] = useAtom(studentProfile);
  const location = useLocation();

  const { Search } = Input;

  return (
    <header className={styles.header}>
      <section className={styles.headerMenuGroup}>
        <button onClick={handleOpenSidebar} className={styles.menuBtn}>
          <Menu />
        </button>
      </section>
      <section className={styles.headerGroup}>
        {/* <div className={styles.search}>
          <SearchIcon />
          <input type="text" placeholder="Type here..." />
        </div> */}

        <CustomDropdown
          dropdownButton={
            // <button className={styles.account}>
            //   {/* <img src={ avatar} alt="woman" /> */}
            //   <Avatar />
            //   {/* <ArrowDown /> */}
            // </button>
            <Avatar className={styles.avatar} />
          }
          dropdownContent={
            <div>
              <hr className={styles.divider} />
              {/* <Button
                className={styles.transparentButton}
                text="Logout"
                iconBefore={<Logout />}
                // onClick={logout}
              /> */}
            </div>
          }
        />
      </section>
    </header>
  );
};

export default Header;
