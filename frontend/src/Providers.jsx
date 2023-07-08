import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Provider } from 'react-redux';
import { ColorModeContext, useMode } from './layouts/theme';
import { store } from './store';

const Providers = ({ children }) => {
	const [theme, colorMode] = useMode();
	return (
		<Provider store={store}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</ColorModeContext.Provider>
		</Provider>
	);
};
export default Providers;
