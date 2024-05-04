import DeleteCarDialog from "@/components/DeleteCarDialog";
import EditCarDialog from "@/components/EditCarDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCar } from "@/redux/actions/car";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "sonner";

const CarsDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { car, isLoading } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCar(navigate, id));
  }, [dispatch, navigate, id]);

  return (
    <div className="space-y-4">
      {!isLoading && car ? (
        <>
          {user?.role == "admin" ||
            (user?.role == "superadmin" && (
              <div className="flex gap-4">
                <EditCarDialog car={car} carId={id} />
                <DeleteCarDialog carId={id} />
              </div>
            ))}
          <img
            src={car?.image}
            alt="car_photo"
            className="object-cover w-[400px] h-[250px] rounded-md"
          />
          <div>
            <form className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Model</Label>
                <Input
                  type="text"
                  value={car ? car.model : "Loading..."}
                  disabled
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Plate</Label>
                <Input
                  type="text"
                  value={car ? car.plate : "Loading..."}
                  disabled
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Rent per Day</Label>
                <Input
                  type="text"
                  value={
                    car
                      ? `Rp. ${car.rentPerDay.toLocaleString()}`
                      : "Loading..."
                  }
                  disabled
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Capacity</Label>
                <Input
                  type="text"
                  value={car ? car.capacity : "Loading..."}
                  disabled
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Availability</Label>
                <Input
                  type="text"
                  value={
                    car
                      ? `${car.available ? "Available" : "Not Available"}`
                      : "Loading..."
                  }
                  disabled
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Year</Label>
                <Input
                  type="text"
                  value={car ? car.year : "Loading..."}
                  disabled
                />
              </div>
            </form>
          </div>
          <Toaster />
        </>
      ) : (
        <LoaderCircle className="h-10 w-full my-4 animate-spin" />
      )}
    </div>
  );
};

export default CarsDetail;
