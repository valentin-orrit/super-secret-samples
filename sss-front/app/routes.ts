import { type RouteConfig, route, index } from '@react-router/dev/routes'

import { loader as audioLoader } from './routes/api.audio.$key'
import { loader as genresLoader } from './routes/api.get-genres'

export default [
    index('./routes/_index.tsx'),

    route('samples', './routes/samples.tsx'),

    // Define dynamic route for /api/audio/:key
    route('api/audio/:key', {
        loader: audioLoader,
    }),

    // Define static route for /api/get-genres
    route('api/get-genres', {
        loader: genresLoader,
    }),
] satisfies RouteConfig
