import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';

const TicketInfo = () => {
	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='h5' component='div' fontWeight='500' sx={{ mb: 2 }}>
					Ticket Info
				</Typography>
				<Divider />
				<Grid container rowSpacing={4} columnSpacing={1} sx={{ my: 0.3 }}>
					<Grid item xs={4}>
						<Typography variant='subtitle1' fontWeight='500'>
							NO
						</Typography>
						<Typography variant='body2'>1</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography variant='subtitle1' fontWeight='500'>
							Subject
						</Typography>
						<Typography variant='body2'>Test 1</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='subtitle1' fontWeight='500'>
							Status
						</Typography>
						<Typography variant='body2'>Pending</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='subtitle1' fontWeight='500'>
							Priority
						</Typography>
						<Typography variant='body2'>Low</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='subtitle1' fontWeight='500'>
							Category
						</Typography>
						<Typography variant='body2'>Development</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1' fontWeight='500'>
							Last Update
						</Typography>
						<Typography variant='body2'>2001-10-26 03:30</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TicketInfo;
