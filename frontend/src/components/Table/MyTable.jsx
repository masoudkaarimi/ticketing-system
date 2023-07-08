import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MyTable = ({ data, keys }) => {
	return (
		<TableContainer sx={{ height: '330px' }}>
			<Table sx={{ minWidth: 650, marginTop: 5, height: '300px' }} stickyHeader size={'small'}>
				<TableHead>
					<TableRow
						sx={{
							backgroundColor: 'grey.main',
							'& .MuiTableCell-root': { color: 'grey.contrastText', backgroundColor: 'inherit' },
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
					sx={{
						'& .MuiTableRow-root .MuiTableCell-root': {
							paddingY: 2,
						},
						'& .MuiTableRow-root:hover': {
							backgroundColor: 'var(--grey-dark) !important',
						},
						'& .MuiTableRow-root:hover .MuiTableCell-root': {
							color: 'var(--text-main) !important',
						},
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
