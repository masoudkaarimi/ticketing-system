import { LogoutRounded, MenuRounded, PersonRounded } from '@mui/icons-material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { Avatar, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/redux/actions/authActions';

function ResponsiveAppBar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state) => state.authReducer);

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar>
					<IconButton
						size='large'
						sx={{ display: { xs: 'block', md: 'none' } }}
						// onClick={}
						// color="inherit"
					>
						<MenuRounded />
					</IconButton>

					<Box
						component={Link}
						to='/'
						sx={{ display: 'flex', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}
					>
						<LogoDevIcon fontSize='large' sx={{ mr: 1 }} />
						<Typography
							variant='h6'
							noWrap
							sx={{
								mr: 2,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							TS
						</Typography>
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							gap: 1,
							'& a': { color: '#fff', textDecoration: 'none', textTransform: 'capitalize' },
						}}
					>
						<Button component={Link} to='/'>
							Dashboard
						</Button>
						<Button component={Link} to='/tickets'>
							Tickets
						</Button>
						<Button component={Link} to='/contact'>
							Contact
						</Button>
					</Box>

					{isAuthenticated ? (
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton size='large' onClick={handleClick}>
								<Avatar
									sx={{ width: 40, height: 40 }}
									src='https://avatars.githubusercontent.com/u/54736752?v=4'
								>
									{user?.username?.substr(0, 1)}
								</Avatar>
							</IconButton>
							<Typography>{user?.username}</Typography>
						</Box>
					) : (
						<>
							<Button variant='contained' color='background' component={Link} to='/login' sx={{ mr: 1 }}>
								Login
							</Button>
							<Button variant='outlined' color='background' component={Link} to='/register'>
								Register
							</Button>
						</>
					)}

					<Menu
						anchorEl={anchorEl}
						id='account-menu'
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: accountMenuStyle,
						}}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<PersonRounded fontSize='small' />
							</ListItemIcon>
							Profile
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<LogoutRounded fontSize='small' />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;

const accountMenuStyle = {
	overflow: 'visible',
	filter: 'drop-shadow(0px 3px 10px rgba(0,0,0,0.15))',
	mt: 1.5,
	'&:before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		top: 0,
		right: 14,
		width: 10,
		height: 10,
		bgcolor: 'background.paper',
		transform: 'translateY(-50%) translateX(-15px) rotate(45deg)',
		zIndex: 0,
	},
};
