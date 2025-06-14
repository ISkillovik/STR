import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <div>
      <NavMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
