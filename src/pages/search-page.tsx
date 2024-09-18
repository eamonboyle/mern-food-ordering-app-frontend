import CuisineFilter from "@/components/cuisine-filter";
import PaginationSelector from "@/components/pagination-selector";
import SearchBar from "@/components/search-bar";
import SearchResultInfo from "@/components/search-result-info";
import SearchResultsCard from "@/components/search-results-card";
import SortDropdown from "@/components/sort-dropdown";
import { useSearchPageLogic } from "@/hooks/use-search-page-logic";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const {
        city,
        isExpanded,
        searchState,
        results,
        handleCuisineChange,
        handlePageChange,
        handleSortOptionChange,
        handleSearchQueryChange,
        handleSearchQueryReset,
        toggleExpanded,
    } = useSearchPageLogic();

    if (!results?.data || !city) return <span>No results found</span>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={handleCuisineChange}
                    isExpanded={isExpanded}
                    onExpandToggle={toggleExpanded}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    placeholder="Search by Cuisine or Restaurant Name"
                    searchQuery={searchState.searchQuery}
                    onReset={handleSearchQueryReset}
                    onSubmit={handleSearchQueryChange}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortDropdown sortOption={searchState.sortOption} onChange={handleSortOptionChange} />
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
                ))}
                <PaginationSelector
                    page={searchState.page}
                    totalPages={results.pagination.pages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default SearchPage;
