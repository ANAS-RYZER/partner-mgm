"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/statusbadge";
import IdShorterComponent from "@/components/IdShorterComponent";

export type RecentAppointmentsRow = {
  _id: string;
  customerName: string;
  date: string;
  slot : string;
};

export const RecentAppointmentsCols = (
  router: ReturnType<typeof useRouter>
): ColumnDef<RecentAppointmentsRow>[] => {
  return [
    {
      header: "Appointment ID",
      accessorKey: "appointmentId",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          <IdShorterComponent id={row.original._id} model="APPT" />
        </span>
      ),
    },

    {
      header: "Customer Name",
      accessorKey: "customerName",
      cell: ({ row }) => (
          <span className="font-medium">
            {row.original.customerName || "-"}
          </span>
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
        return <span>{row.original.slot}</span>;
      },
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