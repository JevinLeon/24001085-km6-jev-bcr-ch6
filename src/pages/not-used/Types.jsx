import { DataTable } from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import TableActions from "@/components/TableActions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const columns = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableActions row={row} />;
    },
  },
];

const TypesPage = () => {
  const [types, setTypes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCars = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/types`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { data } = res.data;
      setTypes(data);
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
      <PageHeader title="Types" />
      <div className="my-4 space-y-4">
        <Button>Add Types</Button>
        {!isLoading && types && types.length == 0 && "No Result Found."}
        {!isLoading && types && (
          <DataTable columns={columns} data={types} />
        )}{" "}
        {isLoading && !types && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
      </div>
    </div>
  );
};

export default TypesPage;
