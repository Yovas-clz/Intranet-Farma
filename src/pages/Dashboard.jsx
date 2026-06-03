import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";

function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="w-100">
        <Navbar />

        <div className="container mt-4">
          <h2>Dashboard</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;