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

function Main () {
	const [context] = useAppContext();

	return (
		<ThemeProvider theme={context.theme === 'dark' ? themeDark : themeLight}>
			<BrowserRouter>
				<ScopedCssBaseline style={{minHeight: "100vh"}}>
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
