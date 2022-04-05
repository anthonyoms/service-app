import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/login/Login";
import { DashboardRoutes } from "./DashboardRoutes";
export const AppRouter = () => {
  const logged = true;
  return (
    <Router>
      <Routes>
        {logged ? (
          <Route path="/*" element={<DashboardRoutes />} />
        ) : (
          <>
            <Route path="/login/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/login/signin" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};
