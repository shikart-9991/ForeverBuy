import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:8080/api/auth/logout",
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="text-center pt-24 text-gray-600">
      Logging out...
    </div>
  );
};

export default Logout;
