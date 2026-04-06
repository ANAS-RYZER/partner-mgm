"use client";
import React from "react";
import TableComponent from "@/components/TableComponent";
import { CalendarCheck2, CheckCircle, LoaderCircle, MapPin, Search, ShoppingCart, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  AppointmentListCols,
  type AppointmentRow,
} from "@/modules/appointments/schema/AppointmentListCols";
import useGetAppointments from "@/modules/appointments/hooks/useGetAppointments";
import { useGetAppointmentKpi } from "../hooks/useGetAppointmentKpi";
import DashboardCard from "@/components/DashboardCard";
import { useDebounce } from "@/hooks/useDebounce";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { AppointmentCard } from "../components/AppointmentCard";

const APPOINTMENT_STATUSES = [
  { label: "All", value: undefined },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Purchased", value: "ISPURCHASED" },
  { label: "Visited", value: "ISVISITED" },
  { label: "Not Visited", value: "NOTVISITED" },
];

function AppointmentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching: isFetchingAppointments } = useGetAppointments(
    debouncedSearchTerm,
    status,
    currentPage,
    limit
  );
  const { data: appointmentKpi, isFetching: isAppointmentKpiLoading } = useGetAppointmentKpi();
  const appointments: AppointmentRow[] = data?.data ?? [];
  const totalPages = data?.totalPages || 1;
  const currentPageNumber = data?.page || currentPage;
  const currentLimit = data?.limit || limit;
  if (isFetchingAppointments && isAppointmentKpiLoading) {
    return <div className="flex items-center justify-center p-10 mt-20">
      <LoaderCircle size={50} className="animate-spin text-gold" />
    </div>
  }
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="font-semibold text-xl md:text-2xl">Appointment Management</h1>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
          <DashboardCard title="Total Appointments" value={appointmentKpi?.total || "0"} rightIcon={<CalendarCheck2 size={20} />} rightIconClassName="text-gray-500 rounded-full p-2 bg-gray-50" />
          <DashboardCard title="Purchased" value={appointmentKpi?.isPurchased || "0"} rightIcon={<ShoppingCart size={20} />} rightIconClassName="text-green-500 rounded-full p-2 bg-green-50" />
          <DashboardCard title="Visited" value={appointmentKpi?.isVisited || "0"} rightIcon={<MapPin size={20} />} rightIconClassName="text-yellow-500 rounded-full p-2 bg-yellow-50" />
          <DashboardCard title="Confirmed" value={appointmentKpi?.confirmed || "0"} rightIcon={<CheckCircle size={20} />} rightIconClassName="text-blue-500 rounded-full p-2 bg-blue-50" />
          <DashboardCard title="Not Visited" value={appointmentKpi?.notVisited || "0"} rightIcon={<XIcon size={20} />} rightIconClassName="text-red-500 rounded-full p-2 bg-red-50" />
        </div>

        {/* Table Header */}
        <p className="text-lg font-semibold">Appointments List</p>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1 ">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground " />
            <Input
              placeholder="Search by name or email... "
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-5 w-full bg-white"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {APPOINTMENT_STATUSES.map((item) => {
              const isActive = status === item.value;
              return (
                <Button
                  key={item.label}
                  onClick={() => {
                    setStatus(item.value);
                    setCurrentPage(1);
                  }}
                  className={clsx(
                    "px-4 py-0! text-xs font-medium rounded-full border transition-all",
                    isActive
                      ? "bg-gold text-white border-gold shadow-sm hover:bg-gold"
                      : "bg-white text-muted-foreground border-gray-200 hover:border-gold! hover:text-white! hover:bg-gold",
                  )}
                >
                  {item.label}
                </Button>
              );
            })}

            {(searchTerm || status) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setStatus(undefined);
                  setCurrentPage(1);
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2"
              >
                <XIcon size={16} />
                Clear
              </Button>
            )}
          </div>
        </div>
        <div className="block space-y-3 md:hidden">
        {
          isFetchingAppointments ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : (
            appointments.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">No appointments found.</p>
            ) : (
              appointments.map((apt) => (
                <AppointmentCard key={apt._id} data={apt} />
              ))
            )
          )
        }
        </div>

        {/* Table */}
        <div className="hidden rounded-xl bg-background md:block">
          {isFetchingAppointments ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : (
            <TableComponent columns={AppointmentListCols(router)} data={appointments} model="Appointment" />
          )}
        </div>
        <Pagination
          currentPage={currentPageNumber}
          totalPages={totalPages}
          hasPreviousPage={currentPageNumber > 1}
          hasNextPage={currentPageNumber < totalPages}
          limit={currentLimit}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(newLimit) => {
            setLimit(newLimit);
            setCurrentPage(1);
          }}
        />
      </div>
    </>
  );
}

export default AppointmentsPage;
