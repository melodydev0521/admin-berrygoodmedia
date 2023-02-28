import React from 'react';
import { getAccounts } from '../api/accounts';

const initialState = {
    mode: 'light',
    accounts: []
};

const AppContext = React.createContext(initialState);

export function AppWrapper({ children }) {

    const [state, setState] = React.useState(initialState);
    
    React.useEffect(() => {
        getInitialContext();
    }, []);
    
    const getInitialContext = async () => {
        const accounts = await getAccounts();
        setState({...state, accounts: accounts});
    }

    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return React.useContext(AppContext);
}