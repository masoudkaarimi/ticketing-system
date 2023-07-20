import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTicket from "./pages/AddTicket";
import RestrictPage from './RestrictPage';
import { checkAuth, requestRefreshToken } from './features/redux/actions/authActions';
import MainLayout from './layouts';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Ticket from './pages/Ticket';

let access_token, refresh_token;

function App() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.authReducer);

	useEffect(() => {
		access_token = localStorage.getItem('access_token');
		refresh_token = localStorage.getItem('refresh_token');

		if (access_token && !isAuthenticated) {
			dispatch(checkAuth());
		} else if (refresh_token && !isAuthenticated) {
			dispatch(requestRefreshToken());
		}

		return () => {
			access_token = null;
			refresh_token = null;
		};
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/login'
					element={
						<RestrictPage path='/' type='isAnonymous'>
							<Login />
						</RestrictPage>
					}
				/>
				<Route
					path={'/register'}
					element={
						<RestrictPage path='/' type='isAnonymous'>
							<Register />
						</RestrictPage>
					}
				/>
				<Route path='/' element={<MainLayout />}>
					<Route
						path='/'
						index
						element={
							<RestrictPage path='/login' type='isAuthenticated'>
								<Dashboard />
							</RestrictPage>
						}
					/>
					<Route
						path='/ticket/:id/'
						index
						element={
							<RestrictPage path='/login' type='isAuthenticated'>
								<Ticket />
							</RestrictPage>
						}
					/>
					<Route
						path='/tickets/add'
						index
						element={
							<RestrictPage path='/login' type='isAuthenticated'>
								<AddTicket />
							</RestrictPage>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
