import React from "react";
import { CartItem, MenuItem as MenuItemType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, ShoppingBag } from "lucide-react";

interface MenuItemProps {
    menuItem: MenuItemType;
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    cartItems: CartItem[];
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItem, setCartItems, cartItems }) => {
    const addToCart = (menuItem: MenuItemType, setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item._id === menuItem._id);

            if (existingItem) {
                return prev.map((item) =>
                    item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...menuItem, quantity: 1 }];
            }
        });
    };

    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{menuItem.name}</span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
                        <span className="mr-1">
                            <ShoppingBag size={16} />
                        </span>
                        {cartItems.find((item) => item._id === menuItem._id)?.quantity || 0} in cart
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <span className="font-bold">£{(menuItem.price / 100).toFixed(2)}</span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(menuItem, setCartItems)}
                    className="flex items-center gap-2"
                >
                    <Plus size={16} />
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default MenuItem;
