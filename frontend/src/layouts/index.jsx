import { Container } from '@mui/material';
import Header from '../components/base/Header';

const MainLayout = ({ children }) => {
	console.log(children);
	return (
		<>
			<Header />
			<Container maxWidth='xl'>{children}</Container>
		</>
	);
};

export default MainLayout;
