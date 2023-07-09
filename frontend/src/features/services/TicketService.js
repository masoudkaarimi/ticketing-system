export const getTicketsAdmin = async () => {
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
