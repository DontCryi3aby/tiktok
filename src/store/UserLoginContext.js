import { createContext, useState } from 'react';

export const Context = createContext();

const UserLoginContext = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const contextValue = {
        loginState: [isUserLoggedIn, setIsUserLoggedIn],
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserLoginContext;
