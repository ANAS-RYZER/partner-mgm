"use client";

import { formatDate } from "@/lib/formatDate";
import { Calendar, Mail } from "lucide-react";

interface CustomerHeaderProps {
  appointmentDetails?: AppointmentDetails;
}

interface AppointmentDetails {
  name?: string;
  customerId?: string;
  email?: string;
  createdDate?: string;
}

export default function CustomerHeader({
  appointmentDetails,
}: CustomerHeaderProps) {
  const { name, customerId, email, createdDate } = appointmentDetails ?? {};

  return (
    <div className="rounded-xl bg-white shadow-md">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-4">
        
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#e8d3a1] flex items-center justify-center text-lg sm:text-xl font-semibold">
            {name?.charAt(0) || "?"}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-medium break-words">
              {name || "-"}
            </h2>
            <p className="text-xs sm:text-sm text-[#A78D71]">
              {customerId
                ? `CUST-${customerId.slice(-3).toUpperCase()}`
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border border-gray-200 w-full" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 text-sm text-gray-600">
        
        {/* Email */}
        <div className="flex items-center gap-2 text-black text-sm sm:text-md break-all">
          <Mail className="text-gold/90 shrink-0" size={20} />
          {email || "-"}
        </div>

        {/* Created Date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-md text-black">
          <span className="text-gray-500 sm:text-black">
            Account Created:
          </span>
          <span>
            {createdDate ? formatDate(createdDate) : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}