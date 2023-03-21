import { createContext, useState } from 'react';

export const Context = createContext();

const UserLoginContext = ({ children }) => {
    // Get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('user')) ?? {};

    const contextValue = {
        currentUser,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserLoginContext;
