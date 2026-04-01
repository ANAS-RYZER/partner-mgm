"use client";
import { PurchasedProductListCols } from "@/modules/appointments/schema/purchasedProductListCols";
import AppointmentDetails from "@/modules/appointments/components/AppointmentDetails";
import TableComponent from "@/components/TableComponent";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetAppointmentDetail } from "../hooks/useGetAppointmentDetail";


function AppointmentDetailPage() {
  const router = useRouter();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { data: appointmentDetail, isFetching: isFetchingAppointmentDetail, error: errorAppointmentDetail } = useGetAppointmentDetail(appointmentId as string);


  //Loading state
  if (isFetchingAppointmentDetail) {
    return <div className="flex items-center justify-center p-10 h-96">
      <LoaderCircle size={50} className="animate-spin text-gold" />
    </div>
  }
  if (errorAppointmentDetail) {
    return <div className="flex items-center justify-center p-10 h-96">
      <p className="text-red-500">Error fetching appointment detail</p>
    </div>
  }
  return (
    <>
      <div className=" p-6 space-y-6 bg-primary">
        <div className="flex text-xl font-bold mb-6 gap-2">
          <ArrowLeft className="cursor-pointer " onClick={() => router.back()} />{" "}
          Appointment Details
        </div>
        <AppointmentDetails
          data={appointmentDetail} />

        <p className="text-lg font-semibold">Product List</p>

        {/* Purchased Products */}
        <div className="rounded-xl bg-background">
          <TableComponent
            columns={PurchasedProductListCols}
            data={appointmentDetail?.products}
            model="Product"
          />
        </div>
      </div>
    </>
  );
}

export default AppointmentDetailPage;
