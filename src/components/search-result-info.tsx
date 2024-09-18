import { Link } from "react-router-dom";

interface Props {
    total: number;
    city: string;
}

const SearchResultInfo = ({ total, city }: Props) => {
    return (
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} restaurant{total > 1 ? "s" : ""} found in {city}
                <Link to="/" className="text-sm font-semibold text-blue-500 underline cursor-pointer ml-2">
                    Change Location
                </Link>
            </span>
        </div>
    );
};

export default SearchResultInfo;
