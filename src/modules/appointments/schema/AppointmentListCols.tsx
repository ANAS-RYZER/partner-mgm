"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/statusbadge";
import IdShorterComponent from "@/components/IdShorterComponent";

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

export const AppointmentListCols = (
  router: ReturnType<typeof useRouter>
): ColumnDef<AppointmentRow>[] => {
  return [
    {
      header: "Appointment ID",
      accessorKey: "_id",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          <IdShorterComponent id={row.original._id} model="APPT" />
        </span>
      ),
    },

    {
      header: "Customer Details",
      accessorKey: "userName",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {row.original.userName || "-"}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.email || "-"}
          </span>
        </div>
      ),
    },

    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => <span>{row.original.date}</span>,
    },

    {
      header: "Slot",
      id: "slot", // ✅ fixed properly
      cell: ({ row }) => {
        const { slotStartTime, slotEndTime } = row.original;
        return (
          <span>
            {slotStartTime && slotEndTime
              ? `${slotStartTime} - ${slotEndTime}`
              : "-"}
          </span>
        );
      },
    },

    {
      header: "No of Products",
      accessorKey: "productCount",
      cell: ({ row }) => (
        <span>{row.original.productCount ?? "-"}</span>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <StatusBadge status={row.original.status} />
      ),
    },

    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const appointmentId = row.original._id;

        return (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() =>
              router.push(`/appointments/${appointmentId}`)
            }
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
};