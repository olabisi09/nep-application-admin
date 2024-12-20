import Button from "../../custom/button/button";

import styles from "./styles.module.scss";

interface Props {
  data?: any;
  handleCloseModal?: () => void;
  handleSubmit?: () => void;
  isLoading: boolean;
  title: any;
  isActive?: any;
  btnText?: any;
}

const DeleteModalContent = ({
  handleCloseModal,
  handleSubmit,
  isLoading,
  title,
  isActive,
  btnText,
}: Props) => {
  return (
    <main className={styles.main}>
      <section className={styles.Wrapper}>
        <p className={styles.para}>
          Are you sure you want to{isActive || " delete "} {title}?
        </p>

        <div className="btn-group">
          <Button onClick={handleCloseModal} variant="text" text="Cancel" />
          <Button
            type="button"
            text={isLoading ? btnText || "Deleting..." : btnText || "Delete"}
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
