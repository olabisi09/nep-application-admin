import Button from "../../custom/button/button";
import { ReactComponent as Icon } from "../../assets/magnifier.svg";
import styles from "./styles.module.scss";

interface Props {
  data?: any;
  handleCloseModal?: () => void;
  handleSubmit?: () => void;
  isLoading: boolean;
  title: any ;
  isActive?:any;
  btnText?:any
}

const DeleteModalContent = ({
  handleCloseModal,
  data,
  handleSubmit,
  isLoading,
  title,
  isActive,
  btnText
}: Props) => {
  return (
    <main className={styles.main}>
      <section className={styles.Wrapper} >
        {/* <Icon /> */}
        {/* <Heading>MESSAGE SENT!</Heading> */}
        <p  className={styles.para} >You are about to {isActive   || ' delete '}{" "}{ title}</p>


        <div className="btn-group">
            <Button onClick={handleCloseModal} variant="text" text="Cancel" />
            <Button
          type="button"
          text={isLoading ? (btnText  || "Deleting..." ): ( btnText || "Delete")}
          disabled={isLoading}
          // text="Delete"
          className={styles.deleteButton}
          onClick={handleSubmit}
        bgColor={"red"}
        />
          </div>
   
      </section>
    </main>
  );
};
export default DeleteModalContent;


