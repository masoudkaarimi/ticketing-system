import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Person } from "@mui/icons-material";
import { login } from "../features/actions/authActions.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.authReducer
  );

  if (!isAuthenticated) navigate("/");

  return (
    <Container maxWidth="sm">
      {/*<Typography>Welcome back dear {user.first_name}</Typography>*/}
    </Container>
  );
};

export default Dashboard;
