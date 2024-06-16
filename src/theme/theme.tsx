import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          colorPrimary: "#173C19",
          colorPrimaryHover: "#E7F5E8",
        },
        components: {
          Table: {
            headerBg: "#E7F5E8",
            headerBorderRadius: 0,
          },
          Modal: {
            padding: 50,
            paddingLG: 50,
            paddingMD: 50,
          },
          Menu: {
            itemHoverBg: "#E7F5E8",
            itemActiveBg: "#E7F5E8",
            itemBorderRadius: 16,
            itemHoverColor: "#173C19",
            lineWidth: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
