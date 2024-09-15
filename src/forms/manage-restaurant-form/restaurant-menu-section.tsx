import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./menu-item-input";

const RestaurantMenuSection = () => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription>Add items to your restaurant's menu.</FormDescription>
            </div>
            <FormField
                control={control}
                name="menuItems"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((_, index) => (
                            <MenuItemInput key={index} index={index} removeMenuItem={() => remove(index)} />
                        ))}
                    </FormItem>
                )}
            />

            {fields.length === 0 && (
                <FormDescription className="text-gray-500">No menu items added yet.</FormDescription>
            )}

            <div className="pt-2">
                <Button type="button" onClick={() => append({ name: "", price: "" })}>
                    Add Menu Item
                </Button>
            </div>
        </div>
    );
};

export default RestaurantMenuSection;
