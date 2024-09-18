import React from "react";
import { Restaurant, CartItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface OrderSummaryProps {
    restaurant: Restaurant;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ restaurant, cartItems, setCartItems }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryPrice = restaurant.deliveryPrice;
    const total = subtotal + deliveryPrice;

    const removeItem = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    };

    return (
        <div className="sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tight">Your Order</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500">Your cart is empty. Add items to your order.</div>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center">
                                    <span className="flex items-center">
                                        <Badge variant="secondary" className="mr-2">
                                            {item.quantity}
                                        </Badge>
                                        <span className="font-medium">{item.name}</span>
                                    </span>
                                    <span className="flex items-center">
                                        <Button variant="ghost" size="sm" onClick={() => removeItem(item._id)}>
                                            <X />
                                        </Button>
                                        <span className="text-gray-600 mr-2">
                                            £{((item.price * item.quantity) / 100).toFixed(2)}
                                        </span>
                                    </span>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>£{(subtotal / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Delivery</span>
                                <span>£{(deliveryPrice / 100).toFixed(2)}</span>
                            </div>
                        </>
                    )}
                </CardContent>
                {cartItems.length > 0 && (
                    <CardFooter className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-orange-600">£{(total / 100).toFixed(2)}</span>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default OrderSummary;
