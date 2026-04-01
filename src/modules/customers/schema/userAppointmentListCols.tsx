"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/ui/statusbadge";
import { useRouter } from "next/navigation";
import IdShorterComponent from "@/components/IdShorterComponent";

export type AppointmentRow = {
  appointmentId: string;
  userId: string;
  customerName: string;
  email: string;
  date: string;
  slot: string;
  numberOfOrders?: number;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};

export const CustomerAppointmentListCols = (
  router: ReturnType<typeof useRouter>
): ColumnDef<AppointmentRow>[] => {
  return [
    {
      header: "Appointment ID",
      accessorKey: "appointmentId",
      cell: ({ row }) => {
        const id = row.original.appointmentId;
        return (
          <span className="font-mono text-xs">
            <IdShorterComponent id={id} model="APPT" />
          </span>
        );
      },
    },

    {
      header: "Customer Details",
      accessorKey: "profile",
      cell: ({ row }) => {
        const customerName = row.original.customerName;
        const email = row.original.email;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{customerName}</span>
            <span className="text-xs">{email}</span>
          </div>
        );
      },
    },

    {
      header: "Slot",
      accessorKey: "Slot",
      cell: ({ row }) => {
        const slot = row.original.slot;
        return <span>{slot}</span>;
      },
    },

    {
      header: "No of Products",
      accessorKey: "numberOfOrders",
      cell: ({ row }) => {
        const orderCount = row.original.numberOfOrders;
        return <span>{orderCount ?? "-"}</span>;
      },
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
        const appointmentId = row.original.appointmentId;
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
    },
  ];
};
