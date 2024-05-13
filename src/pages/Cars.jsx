import NewCarDialog from "@/components/NewCarDialog";
import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { getCars } from "@/redux/actions/car";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CarsPage = () => {
  const dispatch = useDispatch();

  const { cars, isLoading } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Cars" />
      <div className="my-4">
        {user?.role == "admin" ||
          (user?.role == "superadmin" && <NewCarDialog />)}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
        {!isLoading && cars && cars?.length == 0 && "No Result Found."}

        {!isLoading &&
          cars &&
          cars.map((car) => (
            <Link key={car.id} to={`${car.id}`}>
              <Card>
                <img
                  src={car.image}
                  alt="car_img"
                  className="object-cover w-full h-[200px]"
                />
                <CardHeader className="flex flex-col space-y-0 pb-2">
                  <CardTitle className="text-lg">
                    {car.Manufacture.name} | {car.model} | {car.capacity} Car
                    capacity
                  </CardTitle>
                  <CardDescription>{car.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    Rp {car.rentPerDay.toLocaleString()} / day
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        {isLoading &&
          cars?.length == 0 &&
          [0, 0, 0, 0].map((item, i) => (
            <Skeleton key={i} className="h-[400px] w-full" />
          ))}
      </div>
    </div>
  );
};

export default CarsPage;
