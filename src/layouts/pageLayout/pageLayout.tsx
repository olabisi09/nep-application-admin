// import styles from "./styles.module.scss";
// import { ReactComponent as GraterThan } from "../../assets/chevron_forward.svg";

// interface Props {
//   children?: React.ReactNode;
//   paragraph?: string;
//   className?: string;
//   firstText?:string;
//   iconBefore?: React.ReactNode;
//   secondText?:string;
// }

// const PageLayout: React.FC<Props> = ({ children,  paragraph, className,firstText ,iconBefore, secondText}) => {
//   return (
//     <section className={styles.pageLayout}>
//      <section className={className}>
//       <p className= {styles.para}>{firstText} {iconBefore} {secondText}</p>

//       <span className={styles.heading}>{paragraph}</span>
//       {children}
//     </section>
//     </section>

//   );
// };

// export default PageLayout;

import React from "react";
import styles from "./styles.module.scss";

interface PageLayoutProps {
  heading?: string;
  paragraph?: string;
  headerActions?: React.ReactNode;
  footerActions?: React.ReactNode;
  children?: React.ReactNode;
  secondText: string;
  firstText: string;
  iconBefore?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  heading,
  paragraph,
  headerActions,
  footerActions,
  children,
  secondText,
  firstText,
  iconBefore,
}) => {
  return (
    <div className={styles.pageLayout}>
      <header className={styles.header}>
        <p className={styles.para}>
          {firstText} {iconBefore} {secondText}
        </p>
        <section className={styles.section}>
          <p className={styles.heading}>{paragraph}</p>

          <div className={styles.actions}>{headerActions}</div>
        </section>
      </header>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default PageLayout;
