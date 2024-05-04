import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import UserNav from "./UserNav";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2 ">
          <nav className="flex items-center gap-3">
            <ModeToggle />

            <Link>
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <UserNav />
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
