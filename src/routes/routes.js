import config from '~/config';

// Layouts
import { HeaderOnly, FullScreen } from '~/layouts';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Video from '~/pages/Video';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live, layout: FullScreen },
    { path: config.routes.profile, component: Profile, layout: FullScreen },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.video, component: Video, layout: null },
];

export const privateRoutes = [];
