export const StopPropagation = (e) => {
    e.stopPropagation();
};

export const PreventDefault = (e) => {
    e.preventDefault();
};

export const defaultFn = () => {};

export const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
};

export const reloadPage = () => {
    window.location.reload();
};
