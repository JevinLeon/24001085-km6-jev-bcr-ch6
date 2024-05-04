import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/actions/auth";

const UserNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { data } = res.data;
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.photo}
              alt="@jevin"
              className="object-cover"
            />
            <AvatarFallback>
              {user ? user.name.slice(0, 2) : "Loading..."}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user ? user.name : "Loading..."}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user ? user.email : "Loading..."}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
