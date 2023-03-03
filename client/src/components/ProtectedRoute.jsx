import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = () => {

    const [context] = useAppContext();
    const { isAuthenticated } = context;

    // if(checkingStatus) {
    //     return <img src='/loading.svg' width={50} height={50} />
    // }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoute;