import { createContext, useState } from 'react';

export const Context = createContext();

const GlobalContext = ({ children }) => {
    // State provide value context
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const [priorityVideo, setPriorityVideo] = useState({});
    // Get user from local storage
    const currentUser = JSON.parse(localStorage.getItem('user')) ?? {};

    // Provide value to VideoContext
    const contextValue = {
        volumeState: [volume, setVolume],
        mutedState: [isMuted, setIsMuted],
        priorityVideoState: [priorityVideo, setPriorityVideo],
        currentUser,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default GlobalContext;
