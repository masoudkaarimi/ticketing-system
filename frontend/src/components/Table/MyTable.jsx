import {Skeleton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {repeatComponent} from '../../features/utils';

const MyTable = ({data, keys, isLoading}) => {
    return (
        <TableContainer sx={{minHeight: '330px'}}>
            <Table sx={{minWidth: 650, marginTop: 5}} stickyHeader size={'small'}>
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
                        };
                    }}
                >
                    {!isLoading ? data?.length > 0 ? data?.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={(theme) => {
                                    return {
                                        '&.MuiTableRow-root:hover': {
                                            backgroundColor: theme.palette.grey[50],
                                        },
                                    };
                                }}
                            >
                                {keys.map((key, i) => (
                                    <TableCell key={i} align={key.align}>
                                        {key.render(item)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                        : (<TableRow><TableCell
                            colSpan={8} align={"center"}>Ticket list is empty</TableCell></TableRow>) : repeatComponent(TableSkeleton, 4)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default MyTable;

const TableSkeleton = () => {
    return (
        <TableRow>
            <TableCell colSpan={8}>
                <Skeleton variant='rounded' animation={'wave'} width={'100%'} height={35}/>
            </TableCell>
        </TableRow>
    );
};
