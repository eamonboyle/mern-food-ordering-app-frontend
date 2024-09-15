import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const RestaurantImageSection = () => {
    const { control, watch } = useFormContext();

    const existingImageUrl = watch("imageUrl");

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>Upload an image of your restaurant.</FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            alt="Restaurant Image"
                            src={existingImageUrl}
                            className="rounded-md object-cover h-full w-full"
                        />
                    </AspectRatio>
                )}
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="bg-white pt-1.5 pl-1"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) =>
                                        field.onChange(event.target.files ? event.target.files[0] : null)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default RestaurantImageSection;
