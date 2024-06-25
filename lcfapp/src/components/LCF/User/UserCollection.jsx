import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import {LuChevronFirst, LuChevronLast} from "react-icons/lu";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import DeleteBtn from "./DeleteBtn";
import AddUserBtn from "./AddUserBtn";
import EditUserBtn from "./EditUserBtn";
import {RxCaretSort} from "react-icons/rx";
import {userGetall} from "@/Redux/Slices/User.Slice";
import {useDispatch, useSelector} from "react-redux";

const columns = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <div className="h-fit flex items-start gap-1 text-center font-bold">
          ACTION
        </div>
      );
    },
    cell: ({cell}) => (
      <div className="flex h-fit items-center">
        <div className="flex flex-row items-center gap-5">
          <EditUserBtn id={cell.getValue()} />
          <DeleteBtn id={cell.getValue()} />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <>
          <div className="flex items-center justify-between gap-5">
            NAME
            <div
              className="size-5 cursor-pointer flex items-center"
              onClick={() => column.toggleSorting()}
            >
              {column.getIsSorted() ? (
                {
                  asc: <IoIosArrowUp size={"24"} />,
                  desc: <IoIosArrowDown size={"24"} />,
                }[column.getIsSorted()]
              ) : (
                <RxCaretSort size={"24"} />
              )}
            </div>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <>
          <div className="flex items-center justify-between gap-5">
            EMAIL
            <div
              className="size-5 cursor-pointer flex items-center"
              onClick={() => column.toggleSorting()}
            >
              {column.getIsSorted() ? (
                {
                  asc: <IoIosArrowUp size={"24"} />,
                  desc: <IoIosArrowDown size={"24"} />,
                }[column.getIsSorted()]
              ) : (
                <RxCaretSort size={"24"} />
              )}
            </div>
          </div>
        </>
      );
    },
    cell: ({cell}) => <p className="truncate">{cell.getValue()}</p>,
  },
];

const data = [
  {id: 1, name: "Magesh", email: "mageswarang@example.com"},
  {id: 1, name: "Aadhi", email: "aadhi@example.com"},
  {id: 1, name: "Ramkumar", email: "ramkumar@example.com"},
];

export default function UserCollection() {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState();
  const {userCollection} = useSelector((state) => state.User);
  const userTableInstance = useReactTable({
    columns,
    data: userCollection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });
  const {
    nextPage,
    previousPage,
    lastPage,
    firstPage,
    getCanNextPage,
    getCanPreviousPage,
  } = userTableInstance;

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userGetall());
  }, []);

  return (
    <main className="h-full w-full p-10 flex flex-col gap-5">
      <nav className="w-full flex flex-col">
        <h1 className="text-2xl font-bold">Users</h1>
      </nav>
      <section className="overflow-hidden overflow-y-auto">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableCell colSpan={"3"}>
                <div className="flex justify-between items-center">
                  <Input
                    className="w-96 text-lg"
                    placeholder="Search"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
                  <AddUserBtn />
                </div>
              </TableCell>
            </TableRow>
            {userTableInstance.getHeaderGroups().map(({id, headers}) => (
              <TableRow key={id} className="">
                {headers.map(({column, getContext}) => (
                  <TableHead key={column.id}>
                    {flexRender(column.columnDef.header, getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {userTableInstance
              .getRowModel()
              .rows.map(({id, getVisibleCells}) => (
                <TableRow key={id}>
                  {getVisibleCells().map(({id, column, getContext}) => (
                    <TableCell key={id} className="truncate">
                      {flexRender(column.columnDef.cell, getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!userTableInstance.getRowModel().rows.length && (
              <TableRow>
                <TableCell colSpan="3" className="text-center h-20 text-xl">
                  No result
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={"2"}></TableCell>
              <TableCell className="h-fit w-full flex items-center justify-center gap-3">
                <Button
                  disabled={!getCanPreviousPage()}
                  onClick={() => firstPage()}
                  variant="outline"
                >
                  <LuChevronFirst
                    size={"24"}
                    className="hover:text-foreground"
                  />
                </Button>
                <Button
                  disabled={!getCanPreviousPage()}
                  onClick={() => previousPage()}
                  variant="outline"
                >
                  <IoIosArrowBack
                    size={"24"}
                    className="hover:text-foreground"
                  />
                </Button>
                <Button
                  disabled={!getCanNextPage()}
                  onClick={() => nextPage()}
                  variant="outline"
                >
                  <IoIosArrowForward
                    size={"24"}
                    className="hover:text-foreground"
                  />
                </Button>
                <Button
                  disabled={!getCanNextPage()}
                  onClick={() => lastPage()}
                  variant="outline"
                >
                  <LuChevronLast
                    size={"24"}
                    className="hover:text-foreground"
                  />
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </main>
  );
}
