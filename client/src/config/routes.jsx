import HomeIcon from '@mui/icons-material/Home'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Dashboard from '../pages/dashboard/Dashboard'
import MediaAdConnect from '../pages/media-ad-connect/MediaAdConnect'
import AccountSetting from '../pages/accounts/AccountSetting'

const routes = [   
    {
        id: 'dashboard',
        path: '/',
        text: 'Dashboard',
        icon: <HomeIcon />,
        component: <Dashboard />
    },
    {
        id: 'media-ad-connect',
        path: '/media-ad-connect',
        text: 'Connect Media&AdSource',
        icon: <HubOutlinedIcon />,
        component: <MediaAdConnect />
    },
    {
        id: 'account-setting',
        path: '/account-setting',
        text: 'Account Settings',
        icon: <ManageAccountsOutlinedIcon />,
        component: <AccountSetting />
    }
];

export default routes;