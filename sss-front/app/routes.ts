import {
    type RouteConfig,
    route,
    index,
    layout,
} from '@react-router/dev/routes'

const isShowroomMode = process.env.SHOWROOM_MODE === 'true'

// Routes that should be public in showroom mode
const showroomPublicRoutes = [
    route('samples', './routes/samples.tsx'),
    route('sample-request', './routes/sample-request.tsx'),
    route('about', './routes/about.tsx'),
    route('api/audio/:key', './routes/api.audio.$key.tsx'),
    route('api/get-genres', './routes/api.get-genres.tsx'),
    route('api/get-instruments', './routes/api.get-instruments.tsx'),
    route(
        'api/download-sample/:sampleId',
        './routes/api.download-sample.$sampleId.tsx'
    ),
]

export default [
    // Public routes
    index('./routes/_index.tsx'),
    route('logout', './routes/logout.tsx'),
    route('terms-of-use', './routes/terms-of-use.tsx'),

    // Auth action routes
    route('auth/site', './routes/auth.site.tsx'),
    route('auth/admin', './routes/auth.admin.tsx'),

    // Conditionally protected routes
    ...(isShowroomMode
        ? showroomPublicRoutes
        : [layout('./routes/_protected.tsx', showroomPublicRoutes)]),

    // Admin protected routes
    layout('./routes/_admin.tsx', [
        route('sample-upload', './routes/sample-upload._index.tsx'),
        route(
            'sample-upload/fill-sample-data',
            './routes/sample-upload.fill-sample-data.tsx'
        ),
    ]),

    // Catch-all route for unmatched URLs
    route('*', './routes/$.tsx'),
] satisfies RouteConfig