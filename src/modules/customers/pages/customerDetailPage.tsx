"use client";
import CustomerHeader from "@/modules/customers/components/CustomerHeader";
import TableComponent from "@/components/TableComponent";
import { ArrowBigLeft, ArrowLeft, LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { use, useState } from "react";

import { useCustomerAppointmentsListCols } from "@/app/(protected)/schema/userAppointmentListCols";
import { productColumns, PurchasedProduct } from "@/app/(protected)/schema/purchasedProductListCols";
import { useGetCustomerAppointmentDetails } from "../hooks/useGetCustomerAppointments";
import { useGetCustomerDetails } from "../hooks/useGetCustomerDetails";

type Appointment = {
  date: string;
  productIds?: Product[];
};


type Product = {
  name: string;
  image?: string;
  gallery?: string[];
  mrpPrice: number;
  goldSpecs?: {
    metal?: string;
  };
};

export default function CustomerDetailsPage() {
  const params = useParams<{ customerId: string }>();
  const customerId = params.customerId;

  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"appointments" | "products">(
    "appointments",
  );

  const { data, isLoading, error } = useGetCustomerAppointmentDetails(
    customerId as string,
  );

  const { data: customerDetails } = useGetCustomerDetails(customerId as string);

  const cols = productColumns;

  const appointmentColumns = useCustomerAppointmentsListCols();

 const purchasedProducts: PurchasedProduct[] =
  data?.appointments?.flatMap((appointment: Appointment) =>
    appointment.productIds?.map((product) => ({
      type: product?.goldSpecs?.metal === "gold" ? "Gold" : "Jewelry",
      name: product?.name ?? "-",
      image: product?.image ?? product?.gallery?.[0] ?? "",
      date: appointment.date,
      amount: product?.mrpPrice
        ? product.mrpPrice.toLocaleString()
        : "0",
    })) ?? []
  ) ?? [];

const appointmentRows =
  data?.appointments?.map((appointment : any) => ({
    userId: appointment.userId,
    applicantName: customerDetails?.user?.fullName ?? "-",
    email: customerDetails?.user?.email ?? "-",
    date: appointment.date,
    slotStartTime: appointment.slotStartTime,
    slotEndTime: appointment.slotEndTime,
    status: appointment.status,
    noOfOrders: appointment.productIds?.length ?? 0,
  })) ?? [];



  console.log("customer appointments", data);

  return (
    <>
      <div className="p-6 space-y-6 bg-primary">
        <div className="flex text-xl font-bold mb-6 gap-2">
          <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />{" "}
          Customer Details
        </div>
        <CustomerHeader
          avatar={customerDetails?.user?.avatar ?? ""}
          name={customerDetails?.user?.fullName ?? "-"}
          customerId={customerDetails?.user?._id ?? "-"}
          email={customerDetails?.user?.email ?? "-"}
          createdAt={
            customerDetails?.user?.createdAt
              ? new Date(customerDetails.user.createdAt).toLocaleDateString()
              : "-"
          }
        />

        <div className="flex gap-10">
          <h1
            onClick={() => setActiveTab("appointments")}
            className={`font-medium text-lg cursor-pointer ${
              activeTab === "appointments"
                ? "text-gold border-b-2 border-gold"
                : ""
            }`}
          >
            Appointments
          </h1>

          <h1
            onClick={() => setActiveTab("products")}
            className={`font-medium text-lg cursor-pointer ${
              activeTab === "products" ? "text-gold border-b-2 border-gold" : ""
            }`}
          >
            Purchased Products
          </h1>
        </div>

        <div className="rounded-xl bg-background">
          {isLoading ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="p-10 text-red-500">
              Failed to load customer details
            </div>
          ) : activeTab === "appointments" ? (
            <TableComponent
              columns={appointmentColumns}
              data={appointmentRows}
              model="Appointment"
            />
          ) : (
            <TableComponent
              columns={cols}
              data={purchasedProducts}
              model="Product"
            />
          )}
        </div>
      </div>
    </>
  );
}
