
"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/statusbadge";

export type AppointmentRow = {
  _id: string;
  userName: string;
  email: string;
  date: string;
  slotStartTime?: string;
  slotEndTime?: string;
  productCount?: number;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};

export const useAppointmentListCols = (): ColumnDef<AppointmentRow>[] => {
  return [
    {
      header: "Appointment ID",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.original._id;
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
        return <div className="flex flex-col"><span className="font-medium">{row.original.userName || "-"}</span>
        <span className="text-xs">{row.original.email || "-"}</span></div>;
      },
    },

    {
      header: "Date",
      accessorKey: "createdAt",
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
      header: "No of Products",
      accessorKey: "productCount",
      cell: ({ row }) => (
        <span>
         {row.original.productCount ?? "-"}
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
      cell: ({ row }) => {
        const router = useRouter();
        const appointmentId = row.original._id;
        return (  
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-primary/10"
           onClick={() => router.push(`/appointments/${appointmentId}`)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        );
    },
  }
  ];
};
