import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, requestRefreshToken } from "./features/actions/authActions";
import Dashboard from "./pages/Dashboard";

let access_token, refresh_token;

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    access_token = localStorage.getItem("access_token");
    refresh_token = localStorage.getItem("refresh_token");

    if (access_token && !isAuthenticated) {
      dispatch(checkAuth());
    } else if (refresh_token && !isAuthenticated) {
      dispatch(requestRefreshToken())
    }

    return () => {
      access_token = null;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
