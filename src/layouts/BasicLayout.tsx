import Footer from '@/components/Footer';
import type { BasicLayoutProps as ProLayoutProps } from '@ant-design/pro-layout';
import React from 'react';
import Header from './Header';
import styles from './index.less';

export type BasicLayoutProps = {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
} & ProLayoutProps;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div className={styles.mainContent}>{children}</div>
      <div className={styles.mainFooter}>
        <Footer />
      </div>
    </>
  );
};

export default BasicLayout;
