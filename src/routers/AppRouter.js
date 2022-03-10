import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};
