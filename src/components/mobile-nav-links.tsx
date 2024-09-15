import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const MobileNavLinks = () => {
    const { logout } = useAuth0();

    return (
        <>
            <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-orange-500">
                User Profile
            </Link>
            <Link to="/manage-restaurant" className="flex bg-white items-center font-bold hover:text-orange-500">
                Manage Restaurant
            </Link>
            <Button className="flex-1 font-bold px-3 hover:bg-gray-500" onClick={async () => await logout()}>
                Logout
            </Button>
        </>
    );
};

export default MobileNavLinks;
