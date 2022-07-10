import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import Loading from "../components/ui/Loading";
import SignIn from "../pages/login/Login";
import { DashboardRoutes } from "./DashboardRoutes";
export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {!!uid ? (
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
