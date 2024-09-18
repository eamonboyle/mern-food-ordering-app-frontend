import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RestaurantInfoCard from "@/components/restaurant-info-card";
import MenuItem from "@/components/menu-item";
import { useGetRestaurantById } from "@/api/restaurant-api";
import { CartItem } from "@/types";
import OrderSummary from "@/components/order-summary";

const RestaurantDetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurantById(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCartItems = localStorage.getItem(`cartItems_${restaurantId}`);
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem(`cartItems_${restaurantId}`, JSON.stringify(cartItems));
    }, [cartItems, restaurantId]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (!restaurant) {
        return <span>Unable to find restaurant</span>;
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                    alt={restaurant.restaurantName}
                />
            </AspectRatio>

            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfoCard restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem
                            key={menuItem._id}
                            menuItem={menuItem}
                            setCartItems={setCartItems}
                            cartItems={cartItems}
                        />
                    ))}
                </div>

                <OrderSummary restaurant={restaurant} cartItems={cartItems} setCartItems={setCartItems} />
            </div>
        </div>
    );
};

export default RestaurantDetailPage;
