import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RestrictPage = ({ children, path, type }) => {
	const { isAuthenticated } = useSelector((state) => state.authReducer);
	const user = localStorage.getItem('user') || false;
	const access_token = localStorage.getItem('access_token') || false;
	const refresh_token = localStorage.getItem('refresh_token') || false;

	switch (type) {
		case 'isAuthenticated':
			if (isAuthenticated || (user && access_token && refresh_token)) {
				return children;
			}
			return <Navigate to={path} replace />;
		case 'isAnonymous':
			if (!isAuthenticated) {
				return children;
			}
			return <Navigate to={path} replace />;
		case 'isAdmin':
			return children;
		default:
			return <Navigate to='/' replace />;
	}
};

export default RestrictPage;
