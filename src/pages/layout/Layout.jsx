import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function Layout() {
  return (
    <>
      {/* This To Make The Route Start Always From The Header View*/}
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
