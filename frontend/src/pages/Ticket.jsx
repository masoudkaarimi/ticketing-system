import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import TicketChatList from '../components/Tickets/TicketChatList';
import TicketInfo from '../components/Tickets/TicketInfo';

const Ticket = () => {
	const { id } = useParams();

	return (
		<Grid container spacing={2}>
			<Grid item xs={9}>
				<TicketChatList />
			</Grid>
			<Grid item xs={3}>
				<TicketInfo />
			</Grid>
		</Grid>
	);
};

export default Ticket;
