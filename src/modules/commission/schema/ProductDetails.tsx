"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Image from "next/image";

export type ProductDetailsRow = {
  image: string;
  name: string;
  sku: string;
  price?: number;
};

export const ProductDetailsCols : ColumnDef<ProductDetailsRow>[] = [
    {
      header: "Product SKU",
      accessorKey: "sku",
      cell: ({ row }) => (
        <span>{row.original.sku || "-"}</span>
      ),
    },
     {
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span>{row.original.name || "-"}</span>
      ),
    },
    
    {
      header: "Product Price",
      accessorKey: "price",
      cell: ({ row }) => (
        <span>{row.original.price ?? "-"}</span>
      ),
    },
  ];