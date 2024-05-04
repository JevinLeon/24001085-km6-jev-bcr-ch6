import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile } from "@/redux/actions/auth";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile(navigate, null, null));
  }, [dispatch, navigate, token]);

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="my-4 max-w-[50%]">
        <div className="my-4">
          <Avatar className="h-36 w-36">
            <AvatarImage
              src={user?.photo}
              alt="@jevin"
              className="object-cover"
            />
            <AvatarFallback>
              {user ? user.name.slice(0, 2) : "Loading..."}
            </AvatarFallback>
          </Avatar>
        </div>
        <form className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Name</Label>
            <Input
              type="text"
              value={user ? user.name : "Loading..."}
              disabled
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Email</Label>
            <Input
              type="text"
              value={user ? user.email : "Loading..."}
              disabled
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Role</Label>
            <Input
              type="text"
              value={user ? user.role : "Loading..."}
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
