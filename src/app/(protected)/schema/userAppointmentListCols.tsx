
"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/ui/statusbadge";

export type AppointmentRow = {
  userId: string;
  applicantName: string;
  email: string;
  date: string;
  slotStartTime?: string;
  slotEndTime?: string;
  noofOrders?: number;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};

export const useCustomerAppointmentsListCols = (): ColumnDef<AppointmentRow>[] => {
  return [
    {
      header: "Appointment ID",
      accessorKey: "userId",
      cell: ({ row }) => {
        const id = row.original.userId;
        return (
          <span className="font-mono text-xs">
            {id ? `APPT-${id.slice(-3).toUpperCase()}` : "-"}
          </span>
        );
      },
    },

    {
      header: "Customer Details",
      accessorKey: "profile",
      cell: ({ row }) => {
        return <div className="flex flex-col"><span className="font-medium">{row.original.applicantName || "-"}</span>
        <span className="text-xs">{row.original.email || "-"}</span></div>;
      },
    },

    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <span>{row.original.date}</span>
      ),
    },

    {
      header: "Slot",
      accessorKey: "Slot",
      cell: ({ row }) => (
        <span>
         {row.original.slotStartTime
  ? `${row.original.slotStartTime} - ${row.original.slotEndTime}`
  : "-"}

        </span>
      ),
    },

    {
      header: "no of orders",
      accessorKey: "noofOrders",
      cell: ({ row }) => (
        <span>
         {row.original.noofOrders ?? "-"}
        </span>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span>
            <StatusBadge status={status} />
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
