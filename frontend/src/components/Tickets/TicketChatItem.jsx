import { AttachmentRounded } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TicketChatItem = ({ data }) => {
	const { user } = useSelector((state) => state.authReducer);
	const isUser = user?.id == data.user?.id;

	return (
		<>
			<Box
				sx={{
					width: '85%',
					display: 'flex',
					flexDirection: 'column',
					alignSelf: isUser ? 'flex-end' : 'flex-start',
					mb: 3,
				}}
			>
				<Stack
					direction='row'
					alignItems='center'
					gap={1}
					sx={{ alignSelf: isUser ? 'flex-end' : 'flex-start', display: isUser ? 'none' : 'flex' }}
				>
					<Typography
						variant='subtitle1'
						fontWeight='500'
						sx={(theme) => {
							return { color: theme.palette.grey[800] };
						}}
					>
						{data?.user?.first_name}
					</Typography>
					<Typography
						variant='body1'
						fontWeight='300'
						fontSize={13}
						sx={(theme) => {
							return { color: theme.palette.grey[500] };
						}}
					>
						{data?.created_at}
					</Typography>
				</Stack>

				<Box
					sx={(theme) => {
						return {
							backgroundColor: isUser ? theme.palette.grey[50] : theme.palette.grey['A100'],
							borderRadius: 2,
							mt: 1,
							p: 1.5,
							minHeight: 40,
						};
					}}
				>
					<Typography variant='body1' fontSize={14}>
						{data?.message}
					</Typography>
					{data?.attachment && (
						<Box>
							<Divider sx={{ mt: 2 }} />
							<Button
								variant='text'
								size='small'
								component='a'
								href={data.attachment}
								sx={{ mt: 1 }}
								startIcon={<AttachmentRounded />}
							>
								Attachment
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default TicketChatItem;
