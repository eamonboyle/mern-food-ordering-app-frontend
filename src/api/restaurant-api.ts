import { SearchState } from "@/pages/search-page";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantById = (restaurantId?: string) => {
    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/restaurant/${restaurantId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }

        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery(["fetchRestaurantById", restaurantId], getRestaurantByIdRequest);

    return { restaurant, isLoading };
};

export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery("fetchRestaurant", getRestaurantRequest);

    return { restaurant, isLoading };
};

export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();
    };

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { createRestaurant, isLoading };
};

export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to update restaurant");
        }

        return response.json();
    };

    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated!");
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { updateRestaurant, isLoading };
};

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set(
        "selectedCuisines",
        searchState.selectedCuisines.map((cuisine) => encodeURIComponent(cuisine)).join(",")
    );
    params.set("sortOption", searchState.sortOption);

    const searchRestaurantsRequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await fetch(`${API_BASE_URL}/restaurant/search/${city}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to search restaurants");
        }

        return response.json();
    };

    const { data: results, isLoading } = useQuery(["searchRestaurants", searchState], searchRestaurantsRequest, {
        enabled: !!city,
    });

    return { results, isLoading };
};
