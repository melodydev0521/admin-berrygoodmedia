import React from 'react';

const initialState = {
    theme: 'dark',
    token: null,
    isAuthenticated: false,
    checkingStatus: true
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