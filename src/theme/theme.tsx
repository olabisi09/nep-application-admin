import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            // borderColor: "#fffff",
            headerBg: "#ffffff",
            headerBorderRadius: 0,
            // cellPaddingInline: 20,
            // cellPaddingBlock: 10,
            // footerBg: "#11643C",
            // footerColor: "#011602",
            fontFamily: "Nunito Sans",
          },
            Modal:{
            padding: 50,
            paddingLG: 50,
            paddingMD: 50,
           
           },
          // Spin: {
          //   colorPrimary: "#ffffff",
          // },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
