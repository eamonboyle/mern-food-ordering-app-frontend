import React from "react";
import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

interface RestaurantInfoCardProps {
    restaurant: Restaurant;
}

const RestaurantInfoCard: React.FC<RestaurantInfoCardProps> = ({ restaurant }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">{restaurant.restaurantName}</CardTitle>
                <CardDescription className="text-sm text-slate-500">
                    {restaurant.city}, {restaurant.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex">
                {restaurant.cuisines.map((cuisine, index) => (
                    <span key={index} className="flex items-center">
                        <span>{cuisine}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot />}
                    </span>
                ))}
            </CardContent>
        </Card>
    );
};

export default RestaurantInfoCard;
