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
    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    </PaginationItem>
                )}

                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index + 1}>
                        <PaginationLink href="#" isActive={index + 1 === page} onClick={() => onPageChange(index + 1)}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page < totalPages && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSelector;
