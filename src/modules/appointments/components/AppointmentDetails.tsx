"use client";

import React from "react";

type AppointmentDetails = {
  appointmentId: string;
  date: string;
  time: string;
  customerId: string;
  customerName: string;
  email: string;
  phoneNumber?: string;
  noOfOrders: number;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};

interface Props {
  data: AppointmentDetails;
  onEdit?: () => void;
}

const statusStyles: Record<AppointmentDetails["status"], string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AppointmentDetailsCard({ data, onEdit }: Props) {
  return (
    <>
      <div className="w-full rounded-xl bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Appointment ID</span>
          <span className="text-gray-900">{data.appointmentId}</span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Date</span>
          <span className="text-gray-900">{data.date}</span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Time</span>
          <span className="text-gray-900">{data.time}</span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Customer ID</span>
          <span className="text-gray-900">{data.customerId}</span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Customer Name</span>
          <span className="text-gray-900 font-semibold">
            {data.customerName}
          </span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Email</span>
          <span className="text-gray-900">{data.email}</span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">Phone Number</span>
          <span className="text-gray-900">{data.phoneNumber || "-"}</span>
        </div>

        <div className="flex gap-3 pb-5">
          <span className="w-35 text-gray-500">No of Orders</span>
          <span className="text-gray-900">{data.noOfOrders}</span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 pb-5">
          <span className="w-35 text-gray-500">Status</span>
          <span
            className={`rounded-md px-3 py-1 text-xs font-semibold ${statusStyles[data.status]}`}
          >
            {data.status}
          </span>
        </div>
      </div>
    </>
  );
}
