"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import IdShorterComponent from "@/components/IdShorterComponent";
import { formatCurrency } from "@/lib/formatcurrency";

export type CommissionRow = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderAmount?: number;
  commissionAmount?: number;
};

export const CommissionListCols = (
  router: ReturnType<typeof useRouter>
): ColumnDef<CommissionRow>[] => {
  return [
    {
      header: "Order ID",
      accessorKey: "orderId",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          <IdShorterComponent id={row.original.orderId} model="ORD" />
        </span>
      ),
    },

    {
      header: "Customer Details",
      accessorKey: "customerName",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {row.original.customerName || "-"}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.customerEmail || "-"}
          </span>
        </div>
      ),
    },
    {
      header: "Commission Amount",
      accessorKey: "commissionAmount",
      cell: ({ row }) => (
        <span>{formatCurrency(row.original.commissionAmount ?? 0)}</span>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const orderId = row.original.orderId;
        return (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() =>
              router.push(`/commissions/${orderId}`)
            }
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
};