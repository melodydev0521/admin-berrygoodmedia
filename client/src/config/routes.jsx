import HomeIcon from '@mui/icons-material/Home'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Dashboard from '../pages/dashboard/Dashboard'
import MediaAdConnect from '../pages/media-ad-connect/MediaAdConnect'
import AccountSetting from '../pages/accounts/AccountSetting'
import Login from '../pages/signin/Login'
import Page404 from '../pages/404'
import SnapAds from '../pages/snapads-connect/SnapAds' 

const routes = [   
    {
        id: 'dashboard',
        path: '/',
        text: 'Dashboard',
        icon: <HomeIcon />,
        private: true,
        component: <Dashboard />
    },
    {
        id: 'media-ad-connect',
        path: '/media-ad-connect',
        text: 'Media & AdSources',
        private: true,
        icon: <HubOutlinedIcon />,
        component: <MediaAdConnect />
    },
    {
        id: 'account-setting',
        path: '/account-setting',
        text: 'Account',
        private: true,
        icon: <ManageAccountsOutlinedIcon />,
        component: <AccountSetting />
    },
    {
        id: 'snapset-setting',
        path: '/snapset-setting',
        text: 'SnapChat Setting',
        private: true,
        icon: <ManageAccountsOutlinedIcon />,
        component: <SnapAds />
    },
    {
        id: 'login',
        path: '/login',
        standAlone: true,
        component: <Login />
    },
    {
        id: '404',
        path: '/page-404',
        standAlone: true,
        component: <Page404 />
    }
];

export default routes;