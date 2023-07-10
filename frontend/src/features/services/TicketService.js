export const getTicketsAdminApi = async () => {
	const access_token = localStorage.getItem('access_token') || false;
	const response = await fetch('/api/tickets/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	});

	return response.json();
};

export const retrieveTicketApi = async (id) => {
	const access_token = localStorage.getItem('access_token') || false;
	const response = await fetch(`/api/tickets/${id}/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	});

	return response.json();
};

export const newTicketApi = async (body) => {
	const access_token = localStorage.getItem('access_token') || false;

	const response = await fetch(`/api/tickets/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
		body: JSON.stringify(body),
	});

	return response.json();
};
