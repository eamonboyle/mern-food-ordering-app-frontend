import { Link } from "react-router-dom";
import MobileNav from "./mobile-nav";
import MainNav from "./main-nav";

const Header = () => {
    return (
        <header className="border-b-2 border-b-orange-500 py-6">
            <div className="px-6 md:px-0 container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tight text-orange-500">
                    MernEats.com
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </header>
    );
};

export default Header;
