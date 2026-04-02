"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/statusbadge";
import IdShorterComponent from "@/components/IdShorterComponent";
import { formatDate } from "@/lib/formatDate";

export type NewCustomersColsProps = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export const NewCustomersCols   = (
  router: ReturnType<typeof useRouter>
): ColumnDef<NewCustomersColsProps>[] => {
  return [
    {
      header: "Customer ID",
      accessorKey: "_id",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          <IdShorterComponent id={row.original._id} model="CUST" />
        </span>
      ),
    },

    {
      header: "Customer Name",
      accessorKey: "fullName",
      cell: ({ row }) => (
          <span className="font-medium">
            {row.original.fullName || "-"}
          </span>
      ),
    },

    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },

    {
      header: "Created Date",
      accessorKey: "createdAt",
      cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const customerId = row.original._id;

        return (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() =>
              router.push(`/customers/${customerId}`)
            } 
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
};