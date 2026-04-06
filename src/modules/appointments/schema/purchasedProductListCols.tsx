"use client";

import { formatCurrency } from "@/lib/formatcurrency";
import { ColumnDef } from "@tanstack/react-table";

export type PurchasedProduct = {
  _id?: string;
  name: string;
  categories: string;
  price: number;
};

export const PurchasedProductListCols: ColumnDef<PurchasedProduct>[] = [
  {
    accessorKey: "categories",
    header: "Category",
    cell: ({ row }) => {
      const categories = row.original.categories;
      return (
        <span className="font-medium text-[#9c7a3a]">{categories}</span>
      );
    },
  },
  {
    header: "Product Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <span className="font-medium">{name}</span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Product Price",
    cell: ({ row }) => (
      <span className="font-semibold"> {formatCurrency(row.original.price)}</span>
    ),
  },
];
