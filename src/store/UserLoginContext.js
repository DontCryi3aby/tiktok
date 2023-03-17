import { createContext, useState } from 'react';

export const Context = createContext();

const UserLoginContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    const contextValue = {
        currentUserState: [currentUser, setCurrentUser],
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default UserLoginContext;
