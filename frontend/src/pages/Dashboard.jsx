import { Visibility } from '@mui/icons-material';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MyTable from '../components/Table/MyTable';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated, user } = useSelector((state) => state.authReducer);

	return (
		<>
			<Typography>Tickets List</Typography>
			<MyTable data={mockData} keys={TICKETS_HEADERS} />
		</>
	);
};

const TICKETS_HEADERS = [
	{
		title: 'ID',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data.id}</Typography>;
		},
	},
	{
		title: 'User',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data.user.username}</Typography>;
		},
	},
	{
		title: 'Title',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>${data?.title}</Typography>;
		},
	},
	{
		title: 'status',
		align: 'center',
		render(data) {
			let type = '';
			switch (data.status) {
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
			return <Chip color={type} variant={'soft'} label={data.status} />;
		},
	},
	{
		title: 'priority',
		align: 'center',
		render(data) {
			return <Chip color='default' variant={'soft'} label={data.priority} />;
		},
	},
	{
		title: 'category',
		align: 'center',
		render(data) {
			return <Typography variant={'body2'}>{data.category}</Typography>;
		},
	},
	{
		title: 'Date',
		align: 'left',
		render(data) {
			return (
				<Typography variant={'body2'}>
					{new Intl.DateTimeFormat('en-GB', {
						dateStyle: 'full',
						timeStyle: 'short',
					}).format(new Date(data.create_at))}
				</Typography>
			);
		},
	},
	{
		title: 'Actions',
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
		username: 'Masoud',
		title: 'I want buy coffee',
		status: 'PENDING',
		priority: 'High',
		category: 'Support',
		create_at: '2001-10-26',
	},
	{
		id: 2,
		username: 'Amir',
		title: 'I want buy bicycle',
		status: 'ANSWERED',
		priority: 'Low',
		category: 'Development',
		create_at: '2002-3-6',
	},
];

export default Dashboard;
