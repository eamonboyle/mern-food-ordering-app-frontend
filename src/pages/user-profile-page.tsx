import { useGetUser, useUpdateUser } from "@/api/user-api";
import UserProfileForm from "@/forms/user-profile-form";

const UserProfilePage = () => {
    const { currentUser } = useGetUser();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

    if (!currentUser) {
        return <span>Unable to load user profile</span>;
    }

    return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />;
};

export default UserProfilePage;
