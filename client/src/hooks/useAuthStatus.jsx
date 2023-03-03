import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [context, setContext] = useAppContext();

    useEffect(() => {
        if (context.userInfo) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [context.userInfo])

    return { loggedIn, checkingStatus }

}
