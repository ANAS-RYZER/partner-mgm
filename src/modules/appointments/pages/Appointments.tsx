"use client";
import React from "react";
import TableComponent from "@/components/TableComponent";
import { LoaderCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAppointmentListCols } from "@/app/(protected)/schema/appointmentListCols";
import useGetAppointments from "@/modules/appointments/hooks/useGetAppointments";

function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const {data, isLoading, error } = useGetAppointments();

  const appointments = data?.data ?? [];

  const cols = useAppointmentListCols();


    const filteredCustomers = appointments.filter((c:any) =>
        (c.applicantName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="space-y-6">
        <h1 className="font-medium">Appointments Management</h1>

        <div className="flex gap-4">
          {/* Total Applications */}
          <Card className="flex-1 w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{appointments.length}</p>
            </CardContent>
          </Card>

          {/* Approved */}
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{appointments.filter((a: any) => a.status === "CONFIRMED").length}</p>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{appointments.filter((a: any) => a.status === "PENDING").length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative flex-1 ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground " />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-5 w-full bg-white"
          />
        </div>

        <div className="rounded-xl bg-background">
          {isLoading ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="p-10 text-red-500">Failed to load appointments</div>
          ) : (
          <TableComponent columns={cols} data={filteredCustomers} model="Appointment" />
           )} 
        </div>
      </section>
    </>
  );
}

export default AppointmentsPage;
