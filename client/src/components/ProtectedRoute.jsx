import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = () => {

    const [context] = useAppContext();
    const { isAuthenticated, checkingStatus } = context;

    if(checkingStatus) {
        return <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center' }}>
            <img src='/assets/happy-hacker.gif' style={{ alignItems: 'center', width: '150px', height: '150px', margin: '10px auto'}} />
        </div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoute;