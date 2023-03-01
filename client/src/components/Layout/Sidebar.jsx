import React from 'react'
import { useNavigate } from 'react-router';
import {
	Drawer,
	Toolbar,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	FormControlLabel,
	Box
} from '@mui/material'
import routes from '../../config/routes';
import { 
	StyledSidebar,
	StyledAvatar
} from './sidebarStyles';
import ThemeSwitch from './ThemeSwitch';

export default function Sidebar(props) {

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const navigate = useNavigate();
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const container = window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<div>
			<StyledAvatar />
			<p></p>
			<Toolbar />
			{/*<ThemeSwitch />*/}
			<Divider />
			<List>
				{routes.map(({id, path, text, icon}) => (
				<ListItem key={id} disablePadding>
					<ListItemButton onClick={() => navigate(path)}>
						<ListItemIcon>
							{icon}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);

	return (
		<StyledSidebar
			component="nav"
			sx={{ 
				width: '100%',
				minHeight: { md: '100vh' } 
			}}
			aria-label="mailbox folders"
		>
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
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
