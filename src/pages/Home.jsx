import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Car, Factory, Satellite, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [cars, setCars] = useState(null);
  const [manufacturers, setManufacturers] = useState(null);
  const [transmissions, setTransmissions] = useState(null);
  const [types, setTypes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCars = async () => {
    setIsLoading(true);

    try {
      const carsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/cars`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const manufacturersRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/manufactures`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const transmissionsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/transmissions`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const typesRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/types`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { data: cars } = carsRes.data;
      const { data: manufacturers } = manufacturersRes.data;
      const { data: transmissions } = transmissionsRes.data;
      const { data: types } = typesRes.data;

      setCars(cars);
      setManufacturers(manufacturers);
      setTransmissions(transmissions);
      setTypes(types);
    } catch (error) {
      toast(error?.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div>
      <PageHeader title="Home" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
        {!isLoading && cars && manufacturers && transmissions && types ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Cars
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cars.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Manufacturers
                </CardTitle>
                <Factory className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{manufacturers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transmissions
                </CardTitle>
                <Satellite className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{transmissions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Types
                </CardTitle>
                <Type className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{types.length}</div>
              </CardContent>
            </Card>
          </>
        ) : (
          [0, 0, 0, 0].map((item, i) => (
            <Skeleton key={i} className="h-[110px]" />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
