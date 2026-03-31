"use client";
import React from "react";
import TableComponent from "@/components/TableComponent";
import { CalendarCheck2, Check, CheckCircle, CheckCircle2, CircleCheck, CircleCheckIcon, LoaderCircle, MapPin, Search, ShoppingCart, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAppointmentListCols } from "@/app/(protected)/schema/appointmentListCols";
import useGetAppointments from "@/modules/appointments/hooks/useGetAppointments";
import { useGetAppointmentKpi } from "../hooks/useGetAppointmentKpi";
import DashboardCard from "@/components/DashboardCard";
import { useDebounce } from "@/hooks/useDebounce";

function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching: isFetchingAppointments, error } = useGetAppointments(debouncedSearchTerm);
  const { data: appointmentKpi, isFetching: isAppointmentKpiLoading } = useGetAppointmentKpi();
  const appointments = data ?? [];
  const cols = useAppointmentListCols();
  if (isFetchingAppointments && isAppointmentKpiLoading) {
    return <div className="flex items-center justify-center p-10">
      <LoaderCircle size={50} className="animate-spin text-gold" />
    </div>
  }
  return (
    <>
      <section className="space-y-6">
        <h1 className="font-semibold text-2xl">Appointments Management</h1>

        <div className="grid grid-cols-5 gap-2">
          <DashboardCard title="Total Appointments" value={appointmentKpi?.total || "0"} rightIcon={<CalendarCheck2 size={20} />} rightIconClassName="text-gray-500 rounded-full p-2 bg-gray-50" />
          <DashboardCard title="Purchased" value={appointmentKpi?.isPurchased || "0"} rightIcon={<ShoppingCart size={20} />} rightIconClassName="text-green-500 rounded-full p-2 bg-green-50" />
          <DashboardCard title="Visited" value={appointmentKpi?.isVisited || "0"} rightIcon={<MapPin size={20} />} rightIconClassName="text-yellow-500 rounded-full p-2 bg-yellow-50" />
          <DashboardCard title="Confirmed" value={appointmentKpi?.confirmed || "0"} rightIcon={<CheckCircle size={20} />} rightIconClassName="text-blue-500 rounded-full p-2 bg-blue-50" />
          <DashboardCard title="Not Visited" value={appointmentKpi?.notVisited || "0"} rightIcon={<XIcon size={20} />} rightIconClassName="text-red-500 rounded-full p-2 bg-red-50" />
        </div>

        <div className="relative flex-1 ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground " />
          <Input
            placeholder="Search by name or email... "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-5 w-full bg-white"
          />
        </div>

        <div className="rounded-xl bg-background">
          {isFetchingAppointments ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="p-10 text-red-500">Failed to load appointments</div>
          ) : (
            <TableComponent columns={cols} data={appointments} model="Appointment" />
          )}
        </div>
      </section>
    </>
  );
}

export default AppointmentsPage;
