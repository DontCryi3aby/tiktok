import Context from './Context';
import { useRef, useState } from 'react';

const Provider = ({ children }) => {
    // const VOLUME = useRef(0.6);
    const [VL, setVL] = useState(0.6);
    return <Context.Provider value={[VL, setVL]}>{children}</Context.Provider>;
};

export default Provider;
