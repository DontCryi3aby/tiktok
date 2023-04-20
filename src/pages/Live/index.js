import DefaultLiveLoading from './DefaultLiveLoading';

function Live() {
    // Fake livestream
    const hasLivestream = false;

    return <>{hasLivestream ? <></> : <DefaultLiveLoading />}</>;
}

export default Live;
