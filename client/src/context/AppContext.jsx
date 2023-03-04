import React from 'react';

const initialState = {
    theme: 'dark',
    accounts: [],
    token: null,
    isAuthenticated: false
};

const AppContext = React.createContext(initialState);

export function AppWrapper({ children }) {

    const [state, setState] = React.useState(initialState);

    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return React.useContext(AppContext);
}