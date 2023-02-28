import { createContext } from 'react';

export const Context = createContext();

const AuthContext = ({ value, children }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AuthContext;
