import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.authReducer
  );

  return (
    <Container maxWidth="sm">
      <Typography>Welcome back dear </Typography>
    </Container>
  );
};

export default Dashboard;
