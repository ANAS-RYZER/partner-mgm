"use client";

import { formatCurrency } from "@/lib/formatcurrency";
import { ColumnDef } from "@tanstack/react-table";

export type PurchasedProduct = {
  _id?: string;
  productName: string;
  productType: string;
  productPrice: number;
  appointmentDate: string;
};

export const ProductListCols: ColumnDef<PurchasedProduct>[] = [
  {
    accessorKey: "productType",
    header: "Category",
    cell: ({ row }) => {
      const productType = row.original.productType;
      return (
        <span className="font-medium text-[#9c7a3a]">{productType}</span>
      );
    },
  },
  {
    header: "Product Name",
    accessorKey: "productName",
    cell: ({ row }) => {
      const productName = row.original.productName;
      return (
        <span className="font-medium">{productName}</span>
      );
    },
  },
  {
    header: "Purchased Date",
    accessorKey: "appointmentDate",
    cell: ({ row }) => {
      const appointmentDate = row.original.appointmentDate;
      return (
        <span>
          {appointmentDate}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Product Price",
    cell: ({ row }) => (
      <span className="font-semibold"> {formatCurrency(row.original.productPrice)}</span>
    ),
  },
];
