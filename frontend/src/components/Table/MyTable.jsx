import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MyTable = ({ data, keys }) => {
	return (
		<TableContainer sx={{ height: '330px' }}>
			<Table sx={{ minWidth: 650, marginTop: 5 }} stickyHeader size={'small'}>
				<TableHead>
					<TableRow
						sx={{
							backgroundColor: 'grey.main',
							'& .MuiTableCell-root': {
								color: 'grey.contrastText',
								textTransform: 'capitalize',
								backgroundColor: 'inherit',
							},
						}}
					>
						{keys.map((item, index) => (
							<TableCell key={index} align={item.align}>
								{item.title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody
					sx={(theme) => {
						return {
							'& .MuiTableRow-root .MuiTableCell-root': {
								py: 1,
							},
							'& .MuiTableRow-root:hover': {
								backgroundColor: theme.palette.grey[100],
							},
						};
					}}
				>
					{data?.map((item, index) => (
						<TableRow key={index}>
							{keys.map((key, i) => (
								<TableCell key={i} align={key.align}>
									{key.render(item)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default MyTable;
