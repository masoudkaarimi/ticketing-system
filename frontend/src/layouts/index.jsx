import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Base/Header';

const MainLayout = () => {
	return (
		<>
			<Header />
			<Container maxWidth='xl' sx={{ pt: 5 }}>
				<Outlet />
			</Container>
		</>
	);
};

export default MainLayout;
