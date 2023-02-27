import { createContext } from 'react';

export const Context = createContext();

const VideoContext = ({ children, value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default VideoContext;
