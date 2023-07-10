import { AttachmentRounded, SendRounded } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { newTicketApi } from '../../features/services/TicketService';

const TicketReply = ({ data }) => {
	const [formData, setFormData] = useState({
		title: data?.title,
		category: null,
		priority: data?.priority,
		message: data?.message,
		parent: data?.id,
	});

	const ticketMutation = useMutation({
		mutationFn: (newTicket) => newTicketApi(newTicket),
		onSuccess: () => {
			console.log('success');
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		ticketMutation.mutate(formData);
	};

	return (
		<Box sx={{ p: 2, mt: 2, mx: 'auto', borderRadius: 2 }} component={'form'} onSubmit={handleSubmit}>
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
							<IconButton color='primary' type={'submit'}>
								<SendRounded fontSize='large' />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};

export default TicketReply;
