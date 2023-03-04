import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapper, useAppContext } from './context/AppContext';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { themeDark, themeLight } from './mui.config.theme';
import './App.css';
import Sidebar from './components/Layout/Sidebar';
import routes from './config/routes';
import Login from './pages/signin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './api/auth';

function Main () {
	const [context, setContext] = useAppContext();

	React.useEffect(() => {
		if (window.location.pathname !== '/login') {
			// check for token in LS when app first runs
			if (localStorage.token) {
				// if there is a token set axios he`aders for all requests
				setAuthToken(localStorage.token);
			}
			loadtoken();
			// try to fetch a user, if no token or invalid token we
			// will get a 401 response from our API
		}
	}, []);

	const loadtoken = async () => {
		const user = await loadUser();
		setContext({...context, isAuthenticated: true, user: user});
	}

	return (
		<ThemeProvider theme={context.theme === 'dark' ? themeDark : themeLight}>
			<BrowserRouter>
				<ScopedCssBaseline>
					<Grid container direction={'row'} spacing={1}>
						<Grid container item xl={2} lg={3} md={3} xs={12}>
							<Sidebar />
						</Grid>
						<Grid container item xl={10} lg={9} md={9} xs={12}>
							{routes.map(route => 
								<Routes key={route.id}>
										<Route path={route.path} element={route.component} />
								</Routes>
							)}
						</Grid>
					</Grid>
				</ScopedCssBaseline>
				<Routes>
					<Route path='/login' element={<Login />} />					
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

function App() {

	return (
		<AppWrapper>
			<Main />
		</AppWrapper>
	);
}

export default App;
