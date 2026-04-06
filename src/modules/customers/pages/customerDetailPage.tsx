"use client";
import CustomerHeader from "@/modules/customers/components/CustomerHeader";
import TableComponent from "@/components/TableComponent";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  CustomerAppointmentListCols,
  type AppointmentRow,
} from "@/modules/customers/schema/userAppointmentListCols";
import { AppointmentCard } from "@/modules/appointments/components/AppointmentCard";
import { useGetCustomerAppointmentDetails } from "../hooks/useGetCustomerAppointments";
import { useGetCustomerDetails } from "../hooks/useGetCustomerDetails";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useCustomerOrder } from "../hooks/useCustomerOrder";
import {
  ProductListCols,
  type PurchasedProduct,
} from "../schema/ProductListCols";
import { ProductRow } from "@/modules/commission/ui/ProductRow";



export default function CustomerDetailsPage() {
  const params = useParams<{ customerId: string }>();
  const customerId = params.customerId;

  const router = useRouter();


  //hooks
  const { data: appointments, isFetching } = useGetCustomerAppointmentDetails(customerId);
  const { data: customerDetails, isFetching: isCustomerDetailsFetching } = useGetCustomerDetails(customerId);
  const { data: customerOrders, isFetching: isCustomerOrdersFetching } = useCustomerOrder(customerId);

  //Loading state
  if (isCustomerDetailsFetching && (isFetching || isCustomerOrdersFetching)) {
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
          <TabsContent value="appointments" className="mt-4">
            
                <div className="block space-y-3 md:hidden">
                  {(appointments?.data?.length ?? 0) === 0 ? (
                    <p className="py-4 text-sm text-muted-foreground">
                      No appointments found.
                    </p>
                  ) : (
                    ((appointments?.data ?? []) as AppointmentRow[]).map(
                      (row) => (
                        <AppointmentCard
                          key={row.appointmentId}
                          data={{
                            _id: row.appointmentId,
                            date: row.date,
                            customerName: row.customerName,
                            email: row.email,
                            slot: row.slot,
                            productCount: row.numberOfOrders,
                            status: row.status,
                          }}
                        />
                      )
                    )
                  )}
                </div>
                <div className="hidden rounded-xl bg-background md:block">
                  <TableComponent
                    columns={CustomerAppointmentListCols(router)}
                    data={appointments?.data}
                    model="Appointment"
                  />
                </div>
          </TabsContent>
          <TabsContent value="products" className="mt-4">

            <div className="block space-y-3 md:hidden">
              {(customerOrders?.data?.length ?? 0) === 0 ? (
                <p className="py-4 text-sm text-muted-foreground">
                  No purchased products found.
                </p>
              ) : (
                ((customerOrders?.data ?? []) as PurchasedProduct[]).map(
                  (row, index) => (
                    <ProductRow
                      key={
                        row._id ??
                        `${row.productName}-${row.appointmentDate}-${index}`
                      }
                      data={{
                        _id: row._id ?? "",
                        category: row.productType,
                        productName: row.productName,
                        purchasedDate: row.appointmentDate,
                        price: row.productPrice,
                      }}
                    />
                  )
                )
              )}
            </div>
            <div className="hidden rounded-xl bg-background md:block">
              <TableComponent
                columns={ProductListCols}
                data={customerOrders?.data}
                model="Product"
              />
            </div>
        </TabsContent>
      </Tabs>
    </div >
    </>
  );
}
