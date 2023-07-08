import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TicketsList from '../components/Tickets/TicketsList';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated, user } = useSelector((state) => state.authReducer);

	return (
		<>
			<Typography variant='h5' component='h2' fontWeight='500'>
				Tickets List
			</Typography>
			<TicketsList />
		</>
	);
};

export default Dashboard;
