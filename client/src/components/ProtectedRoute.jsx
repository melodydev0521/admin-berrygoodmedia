import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const ProtectedRoute = () => {

    const { loggedIn, checkingStatus } = useAuthStatus();

    if(checkingStatus) {
        return <img src='/loading.svg' width={50} height={50} />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoute;