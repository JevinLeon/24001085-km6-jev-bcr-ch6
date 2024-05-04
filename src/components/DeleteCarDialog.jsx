import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteCar } from "@/redux/actions/car";

const DeleteCarDialog = ({ carId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { isLoading } = useSelector((state) => state.car);

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteCar(navigate, setOpen, carId));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Car</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove this data
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Deleting data.." : "Delete data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCarDialog;
