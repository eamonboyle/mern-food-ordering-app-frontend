import { useSearchRestaurants } from "@/api/restaurant-api";
import SearchBar, { SearchForm } from "@/components/search-bar";
import SearchResultInfo from "@/components/search-result-info";
import SearchResultsCard from "@/components/search-results-card";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
};

const SearchPage = () => {
    const { city } = useParams();

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
    });

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
        }));
    };

    const resetSearchQuery = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
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
            <div id="cuisines-list">Insert cuisines list here</div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultInfo total={results.data.length} city={city} />
                <SearchBar
                    placeholder="Search by Cuisine or Restaurant Name"
                    searchQuery={searchState.searchQuery}
                    onReset={resetSearchQuery}
                    onSubmit={setSearchQuery}
                />

                {/* Insert search results here */}
                {results.data.map((restaurant) => (
                    <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
