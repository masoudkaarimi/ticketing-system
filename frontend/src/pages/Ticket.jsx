import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import TicketChatList from '../components/Tickets/TicketChatList';
import TicketInfo from '../components/Tickets/TicketInfo';
import { retrieveTicketApi } from '../features/services/TicketService';

const Ticket = () => {
	const { id } = useParams();

	const ticketQuery = useQuery({
		queryKey: ['tickets', id],
		queryFn: () => retrieveTicketApi(id),
	});

	return (
		<Grid container spacing={2}>
			<Grid item xs={9}>
				<TicketChatList fetcher={ticketQuery} />
			</Grid>
			<Grid item xs={3}>
				<TicketInfo fetcher={ticketQuery} />
			</Grid>
		</Grid>
	);
};

export default Ticket;
