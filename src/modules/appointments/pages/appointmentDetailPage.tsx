"use client";
import {
  PurchasedProductListCols,
  type PurchasedProduct,
} from "@/modules/appointments/schema/purchasedProductListCols";
import { ProductRow } from "@/modules/commission/ui/ProductRow";
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

  const products = (appointmentDetail?.products ?? []) as PurchasedProduct[];

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
        <>
          <div className="block space-y-3 md:hidden">
            {products.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">
                No products found.
              </p>
            ) : (
              products.map((row, index) => (
                <ProductRow
                  key={row._id ?? `${row.name}-${row.categories}-${index}`}
                  data={{
                    _id: row._id ?? "",
                    category: row.categories,
                    productName: row.name,
                    price: row.price,
                  }}
                />
              ))
            )}
          </div>
          <div className="hidden rounded-xl bg-background md:block">
            <TableComponent
              columns={PurchasedProductListCols}
              data={appointmentDetail?.products}
              model="Product"
            />
          </div>
        </>
      </div>
    </>
  );
}

export default AppointmentDetailPage;
