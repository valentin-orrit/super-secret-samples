import type { LoaderFunctionArgs } from 'react-router'
import prisma from '../../prisma/client'
import { getStreamUrl } from './sample-urls'

export default async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') || '15', 15)
    const searchTerm = url.searchParams.get('search') || ''
    const selectedInstrument = url.searchParams.get('instrument') || ''
    const selectedGenre = url.searchParams.get('genre') || ''
    const sortField = url.searchParams.get('sortField') || 'name'
    const sortDirection = (url.searchParams.get('sortDirection') || 'asc') as
        | 'asc'
        | 'desc'

    // Build where clause with all filters
    const whereConditions = []

    // Search term filter
    if (searchTerm) {
        whereConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive' as const,
                    },
                },
                {
                    tags: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive' as const,
                            },
                        },
                    },
                },
                {
                    genres: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive' as const,
                            },
                        },
                    },
                },
            ],
        })
    }

    // Instrument filter
    if (selectedInstrument) {
        whereConditions.push({
            instruments: {
                some: {
                    name: {
                        equals: selectedInstrument,
                        mode: 'insensitive' as const,
                    },
                },
            },
        })
    }

    // Genre filter
    if (selectedGenre) {
        whereConditions.push({
            genres: {
                some: {
                    name: {
                        equals: selectedGenre,
                        mode: 'insensitive' as const,
                    },
                },
            },
        })
    }

    // Combine all conditions with AND
    const whereClause =
        whereConditions.length > 0 ? { AND: whereConditions } : {}

    const totalCount = await prisma.sample.count({
        where: whereClause,
    })

    // Calculate pagination - disable pagination when any filter is active
    const hasFilters = searchTerm || selectedInstrument || selectedGenre
    const skip = hasFilters ? 0 : (page - 1) * pageSize
    const take = hasFilters ? undefined : pageSize

    // Build order by clause
    let orderBy: any = { name: 'asc' }

    switch (sortField) {
        case 'name':
            orderBy = { name: sortDirection }
            break
        case 'length':
            orderBy = { length: sortDirection }
            break
        case 'bpm':
            orderBy = { bpm: sortDirection === 'asc' ? 'asc' : 'desc' }
            break
        case 'key':
            orderBy = { key: sortDirection }
            break
        case 'loop':
            orderBy = { loop: sortDirection }
            break
        case 'instrument':
            // For related fields, we need to handle differently
            // This sorts by the first instrument name
            orderBy = {
                instruments: {
                    _count: sortDirection,
                },
            }
            break
        default:
            orderBy = { name: 'asc' }
    }

    // Get samples with filters
    const samples = await prisma.sample.findMany({
        where: whereClause,
        skip,
        take,
        include: { genres: true, instruments: true, tags: true },
        orderBy,
    })

    // If sorting by instrument name specifically, we need to do client-side sorting
    // since Prisma doesn't easily support sorting by related field names
    let sortedSamples = samples
    if (sortField === 'instrument') {
        sortedSamples = [...samples].sort((a, b) => {
            const aInstrument = a.instruments[0]?.name || ''
            const bInstrument = b.instruments[0]?.name || ''
            const comparison = aInstrument.localeCompare(bInstrument)
            return sortDirection === 'asc' ? comparison : -comparison
        })
    }

    // Add URLs to samples
    const samplesWithUrls = sortedSamples.map((sample) => ({
        ...sample,
        url: getStreamUrl(sample),
    }))

    return {
        samples: samplesWithUrls,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        searchTerm,
        selectedInstrument,
        selectedGenre,
        sortField,
        sortDirection,
    }
}
