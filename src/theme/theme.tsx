import { FC, PropsWithChildren } from "react";

import { ConfigProvider } from "antd";

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
            padding: 0,
            paddingContentHorizontal: 0,
            paddingContentVertical: 0,
            //headerBg: "#E7F5E8",
            titleColor: "#2D7832",
            titleFontSize: 20,
          },
          Menu: {
            itemHoverBg: "#E7F5E8",
            itemActiveBg: "#E7F5E8",
            itemSelectedBg: "#E7F5E8",
            itemBorderRadius: 16,
            itemHoverColor: "#173C19",
            lineWidth: 0,
            subMenuItemBg: "transparent",
          },
          Card: {
            borderRadiusLG: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
