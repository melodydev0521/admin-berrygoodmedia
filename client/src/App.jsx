import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapper, useAppContext } from './context/AppContext';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { themeDark, themeLight } from './mui.config.theme';
import Sidebar from './components/Layout/Sidebar';
import routes from './config/routes';
import ProtectedRoute from './components/ProtectedRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './api/auth';
import './assets/animations.css'
import './App.css'


function Main () {
	const [context, setContext] = useAppContext();

	React.useEffect(() => {
		if (window.location.pathname !== '/login') {
			setContext({...context, checkingStatus: true})
			if (localStorage.token) {
				setAuthToken(localStorage.token);
			}
			loadtoken();
		}
	}, []);

	const loadtoken = async () => {
		const user = await loadUser();
		setContext({...context, isAuthenticated: true, user: user, checkingStatus: false, token: localStorage.token});
	}
	console.log(context.theme)

	return (
		<ThemeProvider theme={context.theme === 'dark' ? themeDark : themeLight}>
			<BrowserRouter basename='/'>
				<ScopedCssBaseline>
					<Grid container direction={'row'} spacing={1}>
						<Grid container item xl={2} lg={2} md={3} xs={12}>
							<Sidebar />
						</Grid>
						<Grid container item xl={10} lg={10} md={9} xs={12}>
							{routes.filter(item => !item.standAlone).map(route => 
								<Routes key={route.id}>
									<Route path={route.path} element={<ProtectedRoute />}>
										<Route path={route.path} element={route.component} />
									</Route>
								</Routes>
							)}
						</Grid>
					</Grid>
				</ScopedCssBaseline>
				{routes.filter(item => item.standAlone).map(route => 
					<Routes key={route.id}>
						<Route path={route.path} element={route.component} />					
					</Routes>
				)}
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
