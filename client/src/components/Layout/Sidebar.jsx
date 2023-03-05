import React from 'react'
import { useNavigate, useLocation } from 'react-router';
import {
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	Box
} from '@mui/material'
import routes from '../../config/routes';
import { 
	StyledSidebar,
	StyledAvatar
} from './sidebarStyles';
// import ThemeSwitch from './ThemeSwitch';
import { useAppContext } from '../../context/AppContext';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar(props) {

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [context, setContext] = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	React.useEffect(() => {
		const isPageMatched = routes.map(r => r.path)
			.filter(i => i === location.pathname).length === 0 ? false : true;
		if (!isPageMatched) {
			navigate('/page-404');
		}
	}, []);

	const container = window !== undefined ? () => window().document.body : undefined;

	const logoutUser = () => {
		setContext({...context, isAuthenticated: false, user: null});
		localStorage.clear();
		navigate('/login');
	}

	const drawer = (
		<div>
			<StyledAvatar src='/logo.png' />
			{/*<ThemeSwitch />*/}
			<Divider />
			<List>
				{routes.filter(item => !item.standAlone).map(({id, path, text, icon}) => (
					<ListItem key={id}>
						<ListItemButton onClick={() => navigate(path)} sx={{borderRadius: '15px'}}>
							<ListItemIcon>
								{icon}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem>
					<ListItemButton onClick={logoutUser}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='logout' />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);

	return (
		<StyledSidebar
			component="nav"
			sx={{ 
				width: '100%',
				minHeight: { md: '100vh' } 
			}}
			style={{ display: routes.filter(i => i.standAlone && i.path === location.pathname).length !== 0 ? 
				'none' : 'block'
			}}
		>
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
				}}
			>
				{drawer}
			</Drawer>
			<Box
				sx={{
					display: { xs: 'none', md: 'block' }
				}}
				open
			>
				{drawer}
			</Box>
		</StyledSidebar>
	)
}
