import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationSelector = ({ page, totalPages, onPageChange }: Props) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => {
                                onPageChange(page - 1);
                            }}
                        />
                    </PaginationItem>
                )}

                {pageNumbers.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            href="#"
                            isActive={pageNumber === page}
                            onClick={() => {
                                onPageChange(pageNumber);
                            }}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => {
                                onPageChange(page + 1);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSelector;
