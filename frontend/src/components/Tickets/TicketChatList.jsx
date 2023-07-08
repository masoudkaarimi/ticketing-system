import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import TicketChatItem from '../Tickets/TicketChatItem';

const TicketChatList = () => {
	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='h5' component='div' fontWeight='500' sx={{ mb: 2 }}>
					Chat
				</Typography>
				<Divider />
				<Box sx={{ my: 3, display: 'flex', flexDirection: 'column', rowGap: 1, flexWrap: 'wrap' }}>
					{mockData?.map((item, index) => (
						<TicketChatItem key={index} data={item} />
					))}
				</Box>
			</CardContent>
		</Card>
	);
};

const mockData = [
	{
		user: {
			id: 13,
			first_name: 'Amir',
		},
		message: 'This is test message from Amir',
		created_at: '2023-10-26',
		attachment: 'sd',
	},
	{
		user: {
			id: 2,
			first_name: 'Masoud',
		},
		message: 'This is test message from Masoud',
		created_at: '2023-10-26',
	},
	{
		user: {
			id: 13,
			first_name: 'Reza',
		},
		message: 'This is test message from Reza',
		created_at: '2023-10-26',
	},
	{
		user: {
			id: 2,
			first_name: 'Milad',
		},
		message: 'This is test message from Milad',
		created_at: '2023-10-26',
		attachment: 'sd',
	},
];

export default TicketChatList;
