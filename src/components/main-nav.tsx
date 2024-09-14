import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./username-menu";

const MainNav = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <nav>
            {isAuthenticated ? (
                <UsernameMenu />
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold hover:text-orange-500 hover:bg-white"
                    onClick={async () => await loginWithRedirect()}
                >
                    Login
                </Button>
            )}
        </nav>
    );
};

export default MainNav;
