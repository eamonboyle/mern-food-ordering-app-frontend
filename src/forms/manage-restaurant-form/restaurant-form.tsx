import { Form } from "@/components/ui/form";
import { Restaurant } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RestaurantDetailsSection from "./restaurant-details-section";
import { Separator } from "@/components/ui/separator";
import RestaurantCuisinesSection from "./restaurant-cuisines-section";
import RestaurantMenuSection from "./restaurant-menu-section";
import RestaurantImageSection from "./restaurant-image-section";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z
    .object({
        restaurantName: z.string({
            required_error: "Restaurant name is required",
        }),
        city: z.string({
            required_error: "City is required",
        }),
        country: z.string({
            required_error: "Country is required",
        }),
        deliveryPrice: z.coerce.number({
            required_error: "Delivery price is required",
            invalid_type_error: "Must be a valid number",
        }),
        estimatedDeliveryTime: z.coerce.number({
            required_error: "Estimated delivery time is required",
            invalid_type_error: "Must be a valid number",
        }),
        cuisines: z.array(z.string()).nonempty({
            message: "Please select at least one item",
        }),
        menuItems: z.array(
            z.object({
                name: z.string().min(1, "Name is required"),
                price: z.coerce.number().min(1, "Price is required"),
            })
        ),
        imageUrl: z.string().optional(),
        imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
    })
    .refine((data) => data.imageUrl || data.imageFile, {
        message: "Either image URL or image File must be provided",
        path: ["imageFile"],
    });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const RestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        // price lowest domination of 100 = 100pence == 1GBP
        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));

        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted,
        };

        form.reset(updatedRestaurant);
    }, [form, restaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);

        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });

        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }

        onSave(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <RestaurantDetailsSection />
                <Separator />
                <RestaurantCuisinesSection />
                <Separator />
                <RestaurantMenuSection />
                <Separator />
                <RestaurantImageSection />

                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    );
};

export default RestaurantForm;
