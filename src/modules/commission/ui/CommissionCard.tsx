"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatcurrency";
import IdShorterComponent from "@/components/IdShorterComponent";

export type CommissionCardData = {
  orderId: string;
  customerName: string;
  email: string;
  commissionAmount: number;
};

export function CommissionCard({ data }: { data: CommissionCardData }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/commissions/${data.orderId}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <CardContent className="space-y-3 text-sm">
        
        <div className="flex items-center justify-between gap-2">
          {data.orderId ? (
            <IdShorterComponent id={data.orderId} model="ORD" />
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          )}
          <span className="shrink-0 font-semibold">
            {formatCurrency(data.commissionAmount ?? 0)}
          </span>
        </div>

        <div>
          <p className="text-lg font-semibold">{data.customerName || "-"}</p>
          <p className="truncate text-xs text-muted-foreground">
            {data.email || "-"}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}