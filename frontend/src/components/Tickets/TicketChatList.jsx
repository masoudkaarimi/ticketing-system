import { AttachmentRounded, SendRounded } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
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

				<Divider />

				<Box sx={{ p: 2, mt: 2, mx: 'auto', borderRadius: 2 }}>
					<TextField
						id='ticket_reply'
						variant='standard'
						label='Your Message'
						multiline
						fullWidth
						rows={4}
						size='small'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton color='inherit'>
										<AttachmentRounded fontSize='large' />
									</IconButton>
									<IconButton color='primary'>
										<SendRounded fontSize='large' />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
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
