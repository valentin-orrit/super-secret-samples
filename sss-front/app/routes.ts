import { type RouteConfig, route, index } from '@react-router/dev/routes'

export default [
    // Main routes
    index('./routes/_index.tsx'),
    route('samples', './routes/samples.tsx'),
    route('sample-request', './routes/sample-request.tsx'),

    // Sample upload routes
    route('sample-upload', './routes/sample-upload._index.tsx'),
    route(
        'sample-upload/fill-sample-data',
        './routes/sample-upload.fill-sample-data.tsx'
    ),

    // API routes
    route('api/audio/:key', './routes/api.audio.$key.tsx'),
    route('api/get-genres', './routes/api.get-genres.tsx'),
    route('api/get-instruments', './routes/api.get-instruments.tsx'),
    route(
        'api/download-sample/:sampleId',
        './routes/api.download-sample.$sampleId.tsx'
    ),

    // Catch-all route for unmatched URLs
    route('*', './routes/$.tsx'),
] satisfies RouteConfig
