import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Oops! Page not found.</p>
            <p className="mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link to="/" className="bg-orange-500 hover:bg-orange-600">
                    Go back to homepage
                </Link>
            </Button>
        </div>
    );
};

export default NotFoundPage;
