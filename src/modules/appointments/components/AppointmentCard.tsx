"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/ui/statusbadge";
import IdShorterComponent from "@/components/IdShorterComponent";

/** Supports full list rows and dashboard “recent” rows (customerName + slot string). */
export type AppointmentCardData = {
  _id: string;
  date: string;
  userName?: string;
  customerName?: string;
  email?: string;
  slot?: string;
  slotStartTime?: string;
  slotEndTime?: string;
  productCount?: number;
  status?: string | undefined;
};

export function AppointmentCard({ data }: { data: AppointmentCardData }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/appointments/${data._id}`);
  };

  const displayName = data.userName ?? data.customerName ?? "-";
  const timeLine =
    data.slotStartTime && data.slotEndTime
      ? `${data.slotStartTime} - ${data.slotEndTime}`
      : data.slot ?? "-";
  const status = data.status ?? undefined;
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={handleClick}
    >

      <CardContent className="space-y-3 text-sm">
        <div>
          <div className="flex items-center justify-between">
          <IdShorterComponent id={data._id} model="APPT" />
          {status && <StatusBadge status={status} />}
          </div>
          <p className="text-lg font-semibold">{displayName}</p>
          {data.email ? (
            <p className="text-xs text-muted-foreground">{data.email}</p>
          ) : null}
        </div>

        <div className="flex justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">{data.date || "-"}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-medium">{timeLine}</p>
          </div>
        </div>

        {data.productCount != null ? (
          <div>
            <p className="text-xs text-muted-foreground">Products</p>
            <p className="text-lg font-medium">{data.productCount}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
