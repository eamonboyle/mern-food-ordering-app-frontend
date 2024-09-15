import { useCreateRestaurant, useGetRestaurant, useUpdateRestaurant } from "@/api/restaurant-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RestaurantForm from "@/forms/manage-restaurant-form/restaurant-form";

const ManageRestaurantPage = () => {
    const { restaurant, isLoading } = useGetRestaurant();
    const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant();

    const isEditing = !!restaurant;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Tabs defaultValue="orders" className="px-5 md:px-0">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
                <h2 className="text-2xl font-bold">ORDER AMOUNT active orders</h2>
                {/* {orders?.map((order) => (
                    <OrderItemCard order={order} />
                ))} */}
            </TabsContent>

            <TabsContent value="manage-restaurant">
                <RestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateLoading || isUpdateLoading}
                />
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
