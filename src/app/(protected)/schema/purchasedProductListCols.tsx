"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type PurchasedProduct = {
  type: "Gold" | "Jewelry";
  name: string;
  image: string;
  date: string;
  amount: number;
};

export const productColumns: ColumnDef<PurchasedProduct>[] = [
  {
    accessorKey: "type",
    header: "Product Type",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.image}
          alt={row.original.name || "Product Image"}
          width={48}
          height={48}
          className="rounded object-cover"
        />
        <span className="font-medium text-[#9c7a3a]">{row.original.type}</span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "date",
    header: "Appointment Date",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Product Price",
    cell: ({ row }) => (
      <span className="font-semibold">₹ {row.original.amount}</span>
    ),
  },
];
