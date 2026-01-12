import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InternCard from "../components/InternCard";
import TaskDashboard from "../components/TaskDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const [intern, setIntern] = useState(null);

  useEffect(() => {
    const storedIntern = localStorage.getItem("intern");

    if (!storedIntern) {
      navigate("/");
      return;
    }

    setIntern(JSON.parse(storedIntern));
  }, [navigate]);

  // USER UPDATE (restricted)
  const updateIntern = async (internId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/interns/${internId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setIntern(data.intern);
      localStorage.setItem("intern", JSON.stringify(data.intern));
    } catch {
      alert("Profile update failed");
    }
  };

  if (!intern) return null;

return (
  <div className="intern_dashboard">

    {/* FLEX CONTAINER */}
    <div className="dashboard-layout">

      {/* LEFT: INTERN DETAILS */}
      <div className="dashboard-left">
        <h1>Profile</h1>
        <InternCard
          intern={intern}
          onUpdate={updateIntern}
          isAdmin={false}
        />

        <button
          className="loginBtn"
          onClick={() => {
            localStorage.removeItem("intern");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* RIGHT: TASKS */}
      <div className="dashboard-right">
        <TaskDashboard internId={intern.internId} />
      </div>
    </div>
  </div>
);
}

export default Dashboard;
