import styles from "./styles.module.scss";
import { ReactComponent as GraterThan } from "../../assets/chevron_forward.svg";

interface Props {
  children?: React.ReactNode;
  paragraph?: string;
  className?: string;
  firstText?:string;
  iconBefore?: React.ReactNode;
  secondText?:string;
}

const PageLayout: React.FC<Props> = ({ children,  paragraph, className,firstText ,iconBefore, secondText}) => {
  return (
    <section className={className}>
      <p className= {styles.para}>{firstText} {iconBefore} {secondText}</p>

      <span className={styles.heading}>{paragraph}</span>
      {children}
    </section>
  );
};

export default PageLayout;
