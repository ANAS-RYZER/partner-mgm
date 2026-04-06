"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatcurrency";
import clsx from "clsx";

export type ProductRowData = {
  _id: string;
  category: string;
  sku?: string;
  productName: string;
  purchasedDate?: string;
  price?: number;
};

export function ProductRow({ data }: { data: ProductRowData }) {
  const router = useRouter();
  const canNavigate = Boolean(data._id);

  const handleClick = () => {
    if (!canNavigate) return;
    router.push(`/products/${data._id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className={clsx(
        "transition-shadow",
        canNavigate && "cursor-pointer hover:shadow-md",
      )}
    >
      <CardContent className="space-y-3 text-sm">
        <div>
          <p
            className={clsx(
              "text-xs text-[#A78D71]",
              data.sku?.trim() ? "font-mono" : "capitalize",
            )}
          >
            {data.sku?.trim() || data.category?.trim() || "-"}
          </p>
          <p className="text-lg font-semibold">{data.productName || "-"}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
         {data.price && <p className="text-lg font-medium text-primary">
              {formatCurrency(data.price)}
            </p>}
          {data.purchasedDate ? (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Purchased</p>
              <p className="font-medium">{data.purchasedDate}</p>
            </div>
          ) : null}
        </div>
    </CardContent>
    </Card>
  );
}