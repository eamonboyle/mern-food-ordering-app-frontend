import { useSearchRestaurants } from "@/api/restaurant-api";
import { SearchForm } from "@/components/search-bar";
import { SearchState } from "@/pages/search-page";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useSearchPageLogic = () => {
    const { city } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const updateSearchState = (updates: Partial<SearchState>) => {
        setSearchState((prevState) => ({
            ...prevState,
            ...updates,
            page: updates.page ?? 1,
        }));
    };

    const handleCuisineChange = (selectedCuisines: string[]) => updateSearchState({ selectedCuisines });
    const handlePageChange = (page: number) => updateSearchState({ page });
    const handleSortOptionChange = (sortOption: string) => updateSearchState({ sortOption });
    const handleSearchQueryChange = (searchFormData: SearchForm) =>
        updateSearchState({ searchQuery: searchFormData.searchQuery });
    const handleSearchQueryReset = () => updateSearchState({ searchQuery: "" });
    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return {
        city,
        isExpanded,
        searchState,
        results,
        isLoading,
        handleCuisineChange,
        handlePageChange,
        handleSortOptionChange,
        handleSearchQueryChange,
        handleSearchQueryReset,
        toggleExpanded,
    };
};
