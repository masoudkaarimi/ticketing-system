import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import TicketChatItem from '../Tickets/TicketChatItem';
import TicketReply from './TicketReply';

const TicketChatList = ({ fetcher }) => {
	const data = fetcher?.data?.results;

	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='h5' component='div' fontWeight='500' sx={{ mb: 2 }}>
					Chat
				</Typography>

				<Divider />

				<Box sx={{ my: 3, display: 'flex', flexDirection: 'column', rowGap: 1, flexWrap: 'wrap' }}>
					<TicketChatItem data={data} isLoading={fetcher?.isLoading} />

					{data?.children?.map((item, index) => (
						<TicketChatItem key={index} data={item} isLoading={fetcher?.isLoading} />
					))}
				</Box>

				<Divider />

				<TicketReply data={data} />
			</CardContent>
		</Card>
	);
};

export default TicketChatList;
