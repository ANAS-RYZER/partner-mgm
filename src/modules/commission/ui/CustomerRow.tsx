"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import IdShorterComponent from "@/components/IdShorterComponent";

export type CustomerRowData = {
    _id: string;
    customerId?: string;
    customerName: string;
    email: string;
    createdAt: string;
};

export function CustomerRow({ data }: { data: CustomerRowData }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/customers/${data._id}`);
    };

    return (
        <Card
            onClick={handleClick}
            className="cursor-pointer transition-shadow hover:shadow-md"
        >
            <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <IdShorterComponent id={data._id} model="CUST" />
                    {data?.createdAt && <span>{data.createdAt}</span>}
                </div>

                <div>
                    <span className="font-semibold text-lg">{data.customerName || "-"}</span>
                    <span className="block truncate text-muted-foreground">
                        {data.email || "-"}
                    </span>
                </div>


            </CardContent>
        </Card>
    );
}