import { cuisineList } from "@/config/restaurant-options-config";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandToggle: () => void;
}

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandToggle }: Props) => {
    const handleCuisinesReset = () => {
        onChange([]);
    };

    const handleCuisineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (selectedCuisines.includes(value)) {
            onChange(selectedCuisines.filter((cuisine) => cuisine !== value));
        } else {
            onChange([...selectedCuisines, value]);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
                <div
                    className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
                    onClick={handleCuisinesReset}
                >
                    Reset Filters
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine, index) => {
                    const isSelected = selectedCuisines.includes(cuisine);

                    return (
                        <div key={index} className="flex">
                            <input
                                id={`cuisine-${index}`}
                                type="checkbox"
                                className="hidden"
                                value={cuisine}
                                checked={isSelected}
                                onChange={handleCuisineChange}
                            />
                            <label
                                htmlFor={`cuisine-${index}`}
                                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold border ${
                                    isSelected ? "border-green-600 text-green-600" : "border-slate-300"
                                }`}
                            >
                                <span>{cuisine}</span>
                            </label>
                        </div>
                    );
                })}

                <div className="flex justify-center">
                    <Button variant="link" className="text-sm font-semibold text-blue-500" onClick={onExpandToggle}>
                        {isExpanded ? (
                            <span className="flex flex-row items-center gap-1">
                                View Less <ChevronUp />
                            </span>
                        ) : (
                            <span className="flex flex-row items-center gap-1">
                                View More <ChevronDown />
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CuisineFilter;
