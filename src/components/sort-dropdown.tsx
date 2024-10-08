import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Props {
    onChange: (value: string) => void;
    sortOption: string;
}

const SORT_OPTIONS = [
    {
        label: "Best Match",
        value: "bestMatch",
    },
    {
        label: "Delivery Price",
        value: "deliveryPrice",
    },
    {
        label: "Estimated Delivery Time",
        value: "estimatedDeliveryTime",
    },
];

const SortDropdown = ({ onChange, sortOption }: Props) => {
    const selectedLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort by: {selectedLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => onChange(option.value)}
                        className="w-full cursor-pointer"
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortDropdown;
