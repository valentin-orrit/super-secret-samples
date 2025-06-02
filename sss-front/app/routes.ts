import { type RouteConfig, route, index } from '@react-router/dev/routes'

export default [
    // Main routes
    index('./routes/_index.tsx'),
    route('samples', './routes/samples.tsx'),
    route('sample-request', './routes/sample-request.tsx'),
    // route('sample-upload', './routes/sample-upload.tsx'),

    // API routes
    route('api/audio/:key', './routes/api.audio.$key.tsx'),
    route('api/get-genres', './routes/api.get-genres.tsx'),
    route('api/get-instruments', './routes/api.get-instruments.tsx'),
] satisfies RouteConfig
