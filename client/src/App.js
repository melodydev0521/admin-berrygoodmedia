import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapper } from './context/AppContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './mui.config.theme';
import MediaAdConnect from './pages/media-ad-connect/MediaAdConnect';
import Dashboard from './pages/dashboard/Dashboard';
import './App.css';

function App() {

  return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<MediaAdConnect />} />
					</Routes>
					<Routes>
						<Route path='/dashboard' element={<Dashboard />} />
					</Routes>
				</BrowserRouter>
			</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
