import { DataTable } from "@/components/DataTable";
import NewManufacturerDialog from "@/components/NewManufacturerDialog";
import PageHeader from "@/components/PageHeader";
import TableActions from "@/components/TableActions";
import { getManufs } from "@/redux/actions/manufacture";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   id: "edit",
  //   cell: () => {
  //     return <EditManufactureDialog />;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <TableActions
          row={row}
          editFunc={() => console.log("edited")}
          deleteFunc={() => console.log("deleted")}
        />
      );
    },
  },
];

const ManufacturersPage = () => {
  const dispatch = useDispatch();
  const { manufs, isLoading } = useSelector((state) => state.manufacture);

  useEffect(() => {
    dispatch(getManufs());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Manufacturers" />
      <div className="my-4 space-y-4">
        <NewManufacturerDialog />
        {!isLoading && manufs && manufs.length == 0 && "No Result Found."}
        {!isLoading && manufs && <DataTable columns={columns} data={manufs} />}
        {isLoading && !manufs && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
      </div>
    </div>
  );
};

export default ManufacturersPage;
