"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import OrderBreakdown from "../ui/OrderBreakDown";
import {
  ProductDetailsCols,
  type ProductDetailsRow,
} from "../schema/ProductDetails";
import { ProductRow } from "../ui/ProductRow";
import TableComponent from "@/components/TableComponent";
import { useGetCommissionDetails } from "../hooks/useGetCommissionDetails";
import CustomerHeader from "../ui/CommissionHeader";

const CommissionDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const {
    data: commissionDetails,
    isFetching,
    error,
  } = useGetCommissionDetails(orderId as string);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoaderCircle size={40} className="animate-spin text-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500">
        Error fetching commission details
      </div>
    );
  }

  const data = commissionDetails?.data;
  const products = (data?.products ?? []) as ProductDetailsRow[];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl sm:text-2xl font-semibold">
          Commission Details
        </h1>
      </div>

      {/* Customer Card */}
      <CustomerHeader
        name={data?.customerName}
        email={data?.customerEmail}
        orderId={orderId}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Products Table */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                Products Ordered
              </h2>

              <div className="block space-y-3 md:hidden">
                {products.length === 0 ? (
                  <p className="py-2 text-sm text-muted-foreground">
                    No products in this order.
                  </p>
                ) : (
                  products.map((row, index) => (
                    <ProductRow
                      key={`${row.sku}-${row.name}-${index}`}
                      data={{
                        _id: "",
                        category: "",
                        sku: row.sku,
                        productName: row.name,
                        price: row.price,
                      }}
                    />
                  ))
                )}
              </div>
              <div className="hidden w-full overflow-x-auto md:block">
                <TableComponent
                  columns={ProductDetailsCols}
                  data={data?.products ?? []}
                  model="Product"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown */}
        <div>
          <OrderBreakdown
            baseValue={data?.breakdown?.baseValue ?? 0}
            valueAddition={data?.breakdown?.valueAddition ?? 0}
            makingCharges={data?.breakdown?.makingCharges ?? 0}
            discountAmount={data?.breakdown?.discount ?? 0}
            commissionAmount={data?.commissionAmount ?? 0}
          />
        </div>

      </div>
    </div>
  );
};

export default CommissionDetailPage;