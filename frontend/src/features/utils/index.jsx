export const repeatComponent = (Component, length) => {
	if (typeof Component !== 'function' || typeof length !== 'number') {
		throw new Error('Invalid arguments: Expected a component and a length number');
	}

	return Array.from({ length }, (_, i) => <Component key={i} />);
};

export const formatDate = (date = new Date(), locale = 'en-GB') => {
	date = new Date(date);

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date');
	}

	return new Intl.DateTimeFormat(locale, {
		dateStyle: 'full',
		timeStyle: 'short',
	}).format(date);
};
