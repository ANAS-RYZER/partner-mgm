"use client";
import { products } from "@/app/(protected)/schema/applications";
import { productColumns } from "@/app/(protected)/schema/purchasedProductListCols";
import AppointmentDetails from "@/modules/appointments/components/AppointmentDetails";
import TableComponent from "@/components/TableComponent";
import { ArrowLeft, Table } from "lucide-react";
import { useRouter } from "next/navigation";
 

function AppointmentDetailPage() {
  const router = useRouter();

   const appointmentData = {
    appointmentId: 'APPT-548',
    date: '2026-02-18',
    time: '14:00 - 17:00',
    customerId: 'CUST-995',
    customerName: 'Rajesh.Ande',
    email: 'anderajesh15@gmail.com',
    phoneNumber: '',
    noOfOrders: 2,
    status: 'CONFIRMED' as const,
  };

  const cols = productColumns;
  const purchasedProducts = products.map((product) => ({
    type: product?.goldSpecs?.metal === "gold" ? "Gold" : "Jewelry",
    name: product?.name ?? "-",
    image: product?.image ?? product?.gallery?.[0] ?? "",
    date: product.date,
    amount: product?.amount ?? "-",
    status: product?.status ?? "-",
  }));
  return (
    <>
      <div className=" p-6 space-y-6 bg-primary">
        <div className="flex text-xl font-bold mb-6 gap-2">
          <ArrowLeft className="cursor-pointer " onClick={() => router.back()} />{" "}
          Appointment Details
        </div>
        <AppointmentDetails 
        data={appointmentData}/>
        <div>
            <h1>Orders</h1>
           
        </div>
         <div className="rounded-xl bg-background">
          {/* {isLoading ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="p-10 text-red-500">
              Failed to load customer details
            </div>
          ) : ( */}
            <TableComponent
              columns={cols}
              data={purchasedProducts}
              model="Product"
            />
          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default AppointmentDetailPage;
