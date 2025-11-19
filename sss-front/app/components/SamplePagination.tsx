import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination'

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function PaginationControls({
                                               currentPage,
                                               totalPages,
                                               onPageChange,
                                           }: PaginationControlsProps) {
    const getPageNumbers = (isMobile: boolean = false) => {
        const pages = []

        // On mobile, show fewer pages
        if (isMobile) {
            // Always include first page
            pages.push(1)

            // Only show current page if it's not first or last
            if (currentPage > 1 && currentPage < totalPages) {
                if (currentPage > 2) {
                    pages.push(null) // ellipsis
                }
                pages.push(currentPage)
                if (currentPage < totalPages - 1) {
                    pages.push(null) // ellipsis
                }
            }

            // Always include last page if we have more than 1 page
            if (totalPages > 1) {
                pages.push(totalPages)
            }

            return pages
        }

        // Desktop pagination (original logic)
        pages.push(1)

        if (currentPage > 3) {
            pages.push(null)
        }

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (currentPage < totalPages - 2) {
            pages.push(null)
        }

        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    const mobilePageNumbers = getPageNumbers(true)
    const desktopPageNumbers = getPageNumbers(false)

    return (
        <Pagination className="my-1">
            {/* Mobile pagination */}
            <PaginationContent className="sm:hidden gap-1">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        className={`h-8 px-2 ${
                            currentPage <= 1
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }`}
                    />
                </PaginationItem>

                {mobilePageNumbers.map((page, i) =>
                    page === null ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis className="h-8 w-8"/>
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => onPageChange(page)}
                                className="cursor-pointer h-8 w-8 text-sm"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        className={`h-8 px-2 ${
                            currentPage >= totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }`}
                    />
                </PaginationItem>
            </PaginationContent>

            {/* Desktop pagination */}
            <PaginationContent className="hidden sm:flex">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        className={
                            currentPage <= 1
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }
                    />
                </PaginationItem>

                {desktopPageNumbers.map((page, i) =>
                    page === null ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => onPageChange(page)}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        className={
                            currentPage >= totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}