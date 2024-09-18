import { useSearchRestaurants } from "@/api/restaurant-api";
import CuisineFilter from "@/components/cuisine-filter";
import PaginationSelector from "@/components/pagination-selector";
import SearchBar, { SearchForm } from "@/components/search-bar";
import SearchResultInfo from "@/components/search-result-info";
import SearchResultsCard from "@/components/search-results-card";
import SortDropdown from "@/components/sort-dropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const { city } = useParams();

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    };

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    };

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
        }));
    };

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const resetSearchQuery = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!results?.data || !city) {
        return <span>No results found</span>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandToggle={() => setIsExpanded((prev) => !prev)}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    placeholder="Search by Cuisine or Restaurant Name"
                    searchQuery={searchState.searchQuery}
                    onReset={resetSearchQuery}
                    onSubmit={setSearchQuery}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />

                    <SortDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>

                {results.data.map((restaurant) => (
                    <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
                ))}

                <PaginationSelector
                    page={searchState.page}
                    totalPages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default SearchPage;
