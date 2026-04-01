"use client";
import CustomerHeader from "@/modules/customers/components/CustomerHeader";
import TableComponent from "@/components/TableComponent";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { CustomerAppointmentListCols } from "@/modules/customers/schema/userAppointmentListCols";
import { useGetCustomerAppointmentDetails } from "../hooks/useGetCustomerAppointments";
import { useGetCustomerDetails } from "../hooks/useGetCustomerDetails";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useCustomerOrder } from "../hooks/useCustomerOrder";
import { ProductListCols } from "../schema/ProductListCols";



export default function CustomerDetailsPage() {
  const params = useParams<{ customerId: string }>();
  const customerId = params.customerId;

  const router = useRouter();


  //hooks
  const { data: appointments, isFetching } = useGetCustomerAppointmentDetails(customerId);
  const { data: customerDetails, isFetching: isCustomerDetailsFetching } = useGetCustomerDetails(customerId);
  const { data: customerOrders, isFetching: isCustomerOrdersFetching } = useCustomerOrder(customerId);
  console.log("customerOrders", customerOrders);

  //Loading state
  if (isCustomerDetailsFetching  && (isFetching || isCustomerOrdersFetching)) {
    return <div className="flex items-center justify-center p-10 h-96">
      <LoaderCircle size={50} className="animate-spin text-gold" />
    </div>
  }

  const customerPayload = customerDetails?.data ?? customerDetails ?? {};
  const customerHeaderData = {
    name: customerPayload?.name ?? customerPayload?.fullName ?? "-",
    customerId: customerPayload?.customerId ?? customerPayload?._id ?? "",
    email: customerPayload?.email ?? "-",
    createdDate:
      customerPayload?.createdDate ??
      "",
  };

  return (
    <>
      <div className="p-6 space-y-6 bg-primary">
        <div className="flex text-xl font-bold mb-6 gap-2">
          <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />{" "}
          Customer Details
        </div>
        <CustomerHeader appointmentDetails={customerHeaderData} />
        {/* Tabs */}
        <Tabs defaultValue="appointments" className="">
          <TabsList className=" rounded-full p-1 gap-2 bg-white">
            <TabsTrigger className="font-medium bg-none data-[state=active]:bg-gold data-[state=active]:text-white cursor-pointer rounded-full" value="appointments">Appointments</TabsTrigger>
            <TabsTrigger className="font-medium bg-none data-[state=active]:bg-gold data-[state=active]:text-white cursor-pointer rounded-full" value="products">Purchased Products</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <TableComponent
              columns={CustomerAppointmentListCols(router)}
              data={appointments?.data}
              model="Appointment"
            />
          </TabsContent>
          <TabsContent value="products">
            <TableComponent
              columns={ProductListCols}
              data={customerOrders?.data}
              model="Product"
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
