import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

function Layout() {
  
  return <div>
    <NavBar />
    <Outlet />
  </div> ;
}

export default Layout;
