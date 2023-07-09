import { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET } from '../../../config';
import {
	AUTH_FAILED,
	AUTH_SUCCESS,
	LOADING_PROGRESS,
	LOAD_USER_FAILED,
	LOAD_USER_SUCCESS,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REFRESH_FAILED,
	REFRESH_SUCCESS,
	REGISTER_FAILED,
	REGISTER_SUCCESS,
} from '../types/authTypes';

export const register = (data) => async (dispatch) => {
	dispatch({ type: LOADING_PROGRESS });

	try {
		const body = JSON.stringify({
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			email: data.email,
			password: data.password,
			confirm_password: data.confirm_password,
		});
		const response = await fetch('/api/account/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body,
		});
		const result = await response.json();

		if (response.status === 201) {
			dispatch({ type: REGISTER_SUCCESS, payload: result });
		} else {
			dispatch({ type: REGISTER_FAILED });
		}

		return result;
	} catch (error) {
		dispatch({ type: REGISTER_FAILED });
		return { error: 'ops !!! something went wrong / maybe a network problem' };
	}
};

export const login = (data) => async (dispatch) => {
	dispatch({ type: LOADING_PROGRESS });

	try {
		const body = JSON.stringify({
			username: data.username,
			password: data.password,
			client_id: PUBLIC_CLIENT_ID,
			client_secret: PUBLIC_CLIENT_SECRET,
			grant_type: 'password',
		});
		const response = await fetch('/auth/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body,
		});
		const result = await response.json();

		if (response.status === 200) {
			dispatch({ type: LOGIN_SUCCESS });

			localStorage.setItem('access_token', result.access_token);
			localStorage.setItem('refresh_token', result.refresh_token);

			return dispatch(loadUser());
		} else {
			dispatch({ type: LOGIN_FAILED });
			return { error: 'Username or password incorrect.' };
		}
	} catch (error) {
		dispatch({ type: LOGIN_FAILED });
		return { error: 'ops !!! something went wrong / maybe a network problem' };
	}
};

export const loadUser = () => async (dispatch) => {
	const access_token = localStorage.getItem('access_token');

	try {
		if (!access_token) {
			return { error: 'User unauthorized to make this request' };
		}

		const response = await fetch('/api/account/verify/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
		const result = await response.json();

		if (response.status === 200) {
			dispatch({ type: LOAD_USER_SUCCESS, payload: result.results });
			localStorage.setItem('user', JSON.stringify(result.results));
			return result;
		} else {
			dispatch({ type: LOAD_USER_FAILED });
			return {
				error: 'ops !!! something went wrong authorize user, Please login again.',
			};
		}
	} catch (error) {
		dispatch({ type: LOAD_USER_FAILED });
		return { error: 'ops !!! something went wrong / maybe a network problem' };
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('user');
	dispatch({ type: LOGOUT_SUCCESS, payload: null });
};

export const checkAuth = () => async (dispatch) => {
	dispatch({ type: LOADING_PROGRESS });

	try {
		const access_token = localStorage.getItem('access_token') || false;

		if (access_token) {
			const response = await fetch('/api/account/verify/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
			});
			const result = await response.json();

			if (response.status === 200) {
				dispatch({ type: AUTH_SUCCESS, payload: result.results });
				localStorage.setItem('user', JSON.stringify(result.results));
				return result.results;
			} else {
				if (response.status === 403 || response.status === 401) {
					dispatch({ type: AUTH_FAILED });
					return dispatch(requestRefreshToken());
				} else {
					dispatch({ type: AUTH_FAILED });
					return { error: 'Failed verify user, Please login again.' };
				}
			}
		}
	} catch (error) {
		dispatch({ type: AUTH_FAILED });
		return { error: 'ops !!! something went wrong / maybe a network problem' };
	}
};

export const requestRefreshToken = () => async (dispatch) => {
	try {
		const refresh_token = localStorage.getItem('refresh_token') || false;

		if (refresh_token) {
			const body = JSON.stringify({
				refresh_token: refresh_token,
				client_id: PUBLIC_CLIENT_ID,
				client_secret: PUBLIC_CLIENT_SECRET,
				grant_type: 'refresh_token',
			});
			const response = await fetch('/auth/token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body,
			});
			const result = await response.json();

			if (response.status === 200) {
				dispatch({ type: REFRESH_SUCCESS });

				localStorage.setItem('access_token', result.access_token);
				localStorage.setItem('refresh_token', result.refresh_token);

				dispatch(checkAuth());
			} else {
				dispatch({ type: REFRESH_FAILED });
				return { error: 'Authentication failed, Please login again.' };
			}
		}
	} catch (error) {
		dispatch({ type: REFRESH_FAILED });
		return { error: 'ops !!! something went wrong / maybe a network problem' };
	}
};
