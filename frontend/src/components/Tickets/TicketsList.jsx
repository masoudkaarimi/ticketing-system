import { Visibility } from '@mui/icons-material';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getTicketsAdmin } from '../../features/services/TicketService';
import MyTable from '../Table/MyTable';

const TicketsList = () => {
	const ticketsQuery = useQuery({
		queryKey: ['tickets'],
		queryFn: getTicketsAdmin,
	});

	console.log(ticketsQuery?.data?.results);

	return <MyTable data={ticketsQuery?.data?.results} keys={TICKETS_HEADERS} />;
};

const TICKETS_HEADERS = [
	{
		title: 'id',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data?.id}</Typography>;
		},
	},
	{
		title: 'user',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data?.user}</Typography>;
		},
	},
	{
		title: 'subject',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data?.title}</Typography>;
		},
	},
	{
		title: 'status',
		align: 'center',
		render(data) {
			let type = '';
			switch (data?.status) {
				case 'PENDING':
					type = 'info';
					break;
				case 'ANSWERED':
					type = 'success';
					break;
				case 'CLOSED':
					type = 'danger';
					break;
			}
			return (
				<Chip
					color={type}
					variant={'soft'}
					label={data?.status.toLowerCase()}
					sx={{ minWidth: '80px', '& .MuiChip-label': { textTransform: 'capitalize' } }}
				/>
			);
		},
	},
	{
		title: 'priority',
		align: 'center',
		render(data) {
			return <Chip color='default' variant={'soft'} label={data?.priority?.name} />;
		},
	},
	{
		title: 'category',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data?.category?.name}</Typography>;
		},
	},
	{
		title: 'date',
		align: 'left',
		render(data) {
			return (
				<Typography variant={'body2'}>
					{new Intl.DateTimeFormat('en-GB', {
						dateStyle: 'full',
						timeStyle: 'short',
					}).format(new Date(data?.update_at))}
				</Typography>
			);
		},
	},
	{
		title: 'actions',
		align: 'left',
		render(data) {
			return (
				<Stack direction={'row'}>
					<IconButton color={'text'} component={Link} to={`/ticket/${data.id}`}>
						<Visibility />
					</IconButton>
				</Stack>
			);
		},
	},
];

const mockData = [
	{
		id: 1,
		user: { username: 'Masoud' },
		subject: 'I want buy coffee',
		status: 'PENDING',
		priority: 'High',
		category: 'Support',
		create_at: '2001-10-26',
	},
	{
		id: 2,
		user: { username: 'Amir' },
		subject: 'I want buy bicycle',
		status: 'ANSWERED',
		priority: 'Low',
		category: 'Development',
		create_at: '2002-3-6',
	},
];

export default TicketsList;
