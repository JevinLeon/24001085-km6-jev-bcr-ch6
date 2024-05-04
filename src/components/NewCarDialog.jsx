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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "@/redux/actions/car";
import { LoaderCircle } from "lucide-react";

const NewCarDialog = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [capacity, setCapacity] = useState("");
  const [year, setYear] = useState("");
  const [available, setAvailable] = useState("true");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { isLoading } = useSelector((state) => state.car);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("model", model);
    data.append("plate", plate);
    data.append("rentPerDay", rentPerDay);
    data.append("capacity", capacity);
    data.append("year", year);
    data.append("available", available);
    data.append("description", description);
    data.append("image", image);

    // DEFAULT VALUES FOR NOW
    data.append("availableAt", "2024-04-16 23:01:53.629 +0700");
    data.append("options", "test a, test b, test c");
    data.append("specs", "test a, test b, test c");
    data.append("manufacture_id", "1");
    data.append("type_id", "1");
    data.append("transmission_id", "1");

    dispatch(addCar(setOpen, data));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Car</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add car</DialogTitle>
          <DialogDescription>Create a new car.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="h-[420px] overflow-scroll pl-2 pr-5">
            <div className="space-y-2 my-2">
              <Label htmlFor="model" className="text-right">
                Model
              </Label>
              <Input
                id="model"
                placeholder="Car model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="plate" className="text-right">
                Plate
              </Label>
              <Input
                id="plate"
                placeholder="Car plate"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="rentPerDay" className="text-right">
                Rent per Day
              </Label>
              <Input
                id="rentPerDay"
                placeholder="Rent per Day"
                value={rentPerDay}
                onChange={(e) => setRentPerDay(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                placeholder="Car capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="available" className="text-right">
                Availability
              </Label>
              <Select
                onValueChange={(e) => setAvailable(e.value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Not Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Car description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label className="text-right" htmlFor="image">
                Image
              </Label>
              <Input
                id="image"
                placeholder="image"
                type="file"
                autoCapitalize="none"
                className="cursor-pointer"
                onChange={(e) => setImage(e.target.files[0])}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading ? "Saving changes.." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCarDialog;
