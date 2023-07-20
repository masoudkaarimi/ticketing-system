import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TicketsList from "../components/Tickets/TicketsList";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.authReducer
  );

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5" component="h2" fontWeight="500">
          Tickets List
        </Typography>
        {!user?.is_staff && (
          <Button
            variant="contained"
            size={"small"}
            component={Link}
            to={"/tickets/add"}
          >
            Add New Ticket
          </Button>
        )}
      </Stack>
      <TicketsList />
    </>
  );
};

export default Dashboard;
