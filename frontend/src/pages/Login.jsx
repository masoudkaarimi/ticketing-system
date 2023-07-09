import { Person } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/redux/actions/authActions.js';

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated, user } = useSelector((state) => state.authReducer);

	if (isAuthenticated) navigate('/dashboard');

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	async function handleOnSubmit(e) {
		e.preventDefault();
		const result = await dispatch(login(formData));

		// if (Object.keys(result.results) > 0) {
		if (result.results) {
			toast.success(`Welcome back dear ${user.first_name}`, { id: 'login-success' });
		} else {
			toast.error(result?.error, { id: 'login-error' });
		}
	}

	return (
		<Container maxWidth='sm'>
			<Box className='center-block'>
				<Card variant='outlined'>
					<CardContent component='form' onSubmit={handleOnSubmit}>
						<Typography variant='h5' component='h1'>
							Login
						</Typography>

						<TextField
							type='text'
							name='username'
							variant='standard'
							label='Username'
							size='small'
							margin='normal'
							fullWidth
							required
							value={formData.username}
							onChange={handleOnChange}
						/>

						<TextField
							type='password'
							name='password'
							variant='standard'
							label='Password'
							size='small'
							margin='normal'
							fullWidth
							required
							error={formData.password.length < 8 && formData.password.length !== 0}
							value={formData.password}
							onChange={handleOnChange}
						/>

						{isLoading ? (
							<Button variant='contained' fullWidth size='large' sx={{ marginTop: 1 }}>
								<CircularProgress size={25} color='background' />
							</Button>
						) : (
							<Button
								variant='contained'
								fullWidth
								size='large'
								type='submit'
								startIcon={<Person />}
								sx={{ marginTop: 1 }}
							>
								Login
							</Button>
						)}
					</CardContent>
				</Card>
			</Box>
		</Container>
	);
};

export default Login;
