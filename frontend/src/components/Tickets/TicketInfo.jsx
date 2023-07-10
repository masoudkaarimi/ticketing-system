import { Card, CardContent, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { formatDate } from '../../features/utils';

const TicketInfo = ({ fetcher }) => {
	const data = fetcher?.data?.results;

	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='h5' component='div' fontWeight='500' sx={{ mb: 2 }}>
					Ticket Info
				</Typography>
				<Divider />

				{!fetcher.isLoading ? (
					<Grid container rowSpacing={4} columnSpacing={1} sx={{ my: 0.3 }}>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								NO
							</Typography>
							<Typography variant='body2'>{data?.id}</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='subtitle1' fontWeight='500'>
								Subject
							</Typography>
							<Typography variant='body2'>{data?.title}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								Status
							</Typography>
							<Typography variant='body2'>{data?.status}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								Priority
							</Typography>
							<Typography variant='body2'>{data?.priority?.name}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								Category
							</Typography>
							<Typography variant='body2'>{data?.category?.name}</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='subtitle1' fontWeight='500'>
								Last Update
							</Typography>
							<Typography variant='body2'>{formatDate(data?.update_at)}</Typography>
						</Grid>
					</Grid>
				) : (
					<Grid container rowSpacing={4} columnSpacing={1} sx={{ my: 0.3 }}>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								NO
							</Typography>
							<Skeleton variant={'text'} animation={'wave'} height={40} />
						</Grid>
						<Grid item xs={8}>
							<Typography variant='subtitle1' fontWeight='500'>
								Subject
							</Typography>
							<Skeleton variant={'text'} animation={'wave'} height={40} />
						</Grid>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								Status
							</Typography>
							<Skeleton variant={'text'} animation={'wave'} height={40} />
						</Grid>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								Priority
							</Typography>
							<Skeleton variant={'text'} animation={'wave'} height={40} />
						</Grid>
						<Grid item xs={4}>
							<Typography variant='subtitle1' fontWeight='500'>
								Category
							</Typography>
							<Skeleton variant={'text'} animation={'wave'} height={40} />
						</Grid>
						<Grid item xs={12}>
							<Typography variant='subtitle1' fontWeight='500'>
								Last Update
							</Typography>
							<Skeleton variant={'text'} animation={'wave'} height={40} />
						</Grid>
					</Grid>
				)}
			</CardContent>
		</Card>
	);
};

export default TicketInfo;
