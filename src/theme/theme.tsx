import { FC, PropsWithChildren } from 'react';

import { ConfigProvider } from 'antd';

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter',
          colorPrimary: 'var(--color-primary)',
          colorPrimaryHover: 'var(--color-secondary)',
        },
        components: {
          Table: {
            headerBg: 'var(--color-secondary)',
            headerBorderRadius: 0,
            headerColor: 'var(--color-primary)',
          },
          Modal: {
            padding: 0,
            paddingContentHorizontal: 0,
            paddingContentVertical: 0,
            headerBg: 'var(--color-secondary)',
            titleColor: 'var(--color-primary)',
            titleFontSize: 20,
          },
          Menu: {
            itemHoverBg: 'var(--color-secondary)',
            itemActiveBg: 'var(--color-secondary)',
            itemSelectedBg: 'var(--color-secondary)',
            itemSelectedColor: 'var(--color-primary)',
            itemBorderRadius: 16,
            itemHoverColor: 'var(--color-primary)',
            lineWidth: 0,
            subMenuItemBg: 'transparent',
          },
          Card: {
            borderRadiusLG: 16,
          },
          Select: {
            optionSelectedBg: 'var(--color-secondary)',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
