import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/actions/auth";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Password does not match!");
    }

    dispatch(register(navigate, name, email, photo, password));
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="photo">
              Photo
            </Label>
            <Input
              id="photo"
              placeholder="photo"
              type="file"
              autoCapitalize="none"
              onChange={(e) => setPhoto(e.target.files[0])}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassworod"
              placeholder="Confirm Password"
              type="password"
              autoCapitalize="none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Loading.." : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
