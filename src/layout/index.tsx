import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import React from "react";

export interface propType {
  children: React.ReactElement;
  header?: false;
  footer?: false;
  isPublic?: false;
  auth?: false;
}

const MainLayout = ({ header, footer, children, auth }: propType) => {
  const Layout = () => (
    <>
      {header && <Header />}
      {children}
      {footer && <Footer />}
    </>
  );
  return auth ? <Layout /> : <Layout />;
};

export default MainLayout;
