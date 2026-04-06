"use client";

import React from "react";
import IdShorterComponent from "@/components/IdShorterComponent";
import StatusBadge from "@/components/ui/statusbadge";

type AppointmentDetails = {
  appointmentId: string;
  date: string;
  time: string;
  customerId: string;
  customerName: string;
  email: string;
  phoneNumber?: string;
  numberOfProducts: number;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};

interface Props {
  data: AppointmentDetails;
  onEdit?: () => void;
}

export default function AppointmentDetailsCard({ data }: Props) {
  return (
    <div className="w-full rounded-xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
      
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Appointment Details
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
        
        <Detail label="Appointment ID">
          <IdShorterComponent id={data.appointmentId} model="APPT" />
        </Detail>

        <Detail label="Date">{data.date}</Detail>

        <Detail label="Time">{data.time}</Detail>

        <Detail label="Customer ID">
          <IdShorterComponent id={data.customerId} model="CUST" />
        </Detail>

        <Detail label="Customer Name">
          <span className="font-medium">{data.customerName}</span>
        </Detail>

        <Detail label="Email">
          <span className="break-all">{data.email}</span>
        </Detail>

        <Detail label="No of Orders">
          {data.numberOfProducts}
        </Detail>

        <Detail label="Status">
          <StatusBadge status={data.status} />
        </Detail>

      </div>
    </div>
  );
}

/* Reusable field component (because repetition is painful) */
function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-xs mb-1">{label}</span>
      <span className="text-gray-900">{children}</span>
    </div>
  );
} 