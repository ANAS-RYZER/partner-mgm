// src/components/TableComponent/columns/appointmentListCols.ts

"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const appointmentListCols = () => {
  return [
    {
      header: "Customer ID",
      accessorKey: "id",
      cell: ({ row }: { row: any }) => {
        const id = row.original.id;
        return (
          <span className="font-mono text-xs">
            {id ? `CUST-${id.slice(-3).toUpperCase()}` : "-"}
          </span>
        );
      },
    },

    {
      header: "Profile",
      accessorKey: "profile",
      cell: ({ row }: { row: any }) => {
        return <div className="flex flex-col"><span className="font-medium">{row.original.applicantName || "sdsdbnhdnbvdbh"}</span>
        <span className="text-xs">{row.original.email || "-"}</span></div>;
      },
    },

    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.createdAt}</span>
      ),
    },

    {
      header: "Slot",
      accessorKey: "Slot",
      cell: ({ row }: { row: any }) => (
        <span>
          {row.original.Slot}
        </span>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              status === "CONFIRMED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "action",
      cell: () => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-primary/10"
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];
};
