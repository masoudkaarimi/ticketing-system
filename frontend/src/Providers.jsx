import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { ColorModeContext, useMode } from './layouts/theme';
import { store } from './store';

const Providers = ({ children }) => {
	const [theme, colorMode] = useMode();

	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</ColorModeContext.Provider>
			</QueryClientProvider>
		</Provider>
	);
};
export default Providers;
