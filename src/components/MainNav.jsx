import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <div className="mr-4 hidden md:flex">
      <div>
        <Link
          to="/"
          className="mr-6 flex items-center space-x-2 font-semibold text-xl"
        >
          Kampus Merdeka
        </Link>
      </div>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          to="/cars"
          className={cn(
            "transition-colors hover:text-foreground/80",
            location.pathname.includes("/cars")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Cars
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;
