import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./mobile-nav-links";

const MobileNav = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-orange-500" />
                            {user?.email}
                        </span>
                    ) : (
                        <span>Welcome to MernEats.com!</span>
                    )}
                </SheetTitle>
                <Separator className="my-4" />
                <SheetDescription className="flex flex-col my-4 gap-4">
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            className="flex-1 font-bold bg-orange-500 hover:bg-orange-600"
                            onClick={async () => await loginWithRedirect()}
                        >
                            Login
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
