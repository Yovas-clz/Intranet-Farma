
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import Sidebar from "../componets/Sidebar";
import Navbar from "../componets/Navbar";
import "../styles/global.css";
import "../styles/dashboard.css";


function Dashboard() {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="d-flex justify-content-center align-items-center dashboard-bg">
          <img src="/logo.png" alt="logo" className="dashboard-logo-bg" />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;