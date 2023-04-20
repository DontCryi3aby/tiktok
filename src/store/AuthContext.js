import { createContext, useRef } from 'react';

export const Context = createContext();

const AuthContext = ({ children }) => {
    // Provide Value To AuthContext
    const modalRef = useRef();

    const ShowModal = (ref) => {
        ref.current.classList.add('show');
        ref.current.classList.remove('hide');
    };

    const HideModal = (ref) => {
        ref.current.classList.remove('show');
        ref.current.classList.add('hide');
    };
    const valueAuthContext = {
        modalRef,
        ShowModal,
        HideModal,
    };

    return <Context.Provider value={valueAuthContext}>{children}</Context.Provider>;
};

export default AuthContext;
