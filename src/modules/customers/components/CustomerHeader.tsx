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
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-[#e8d3a1] flex items-center justify-center text-xl font-semibold">
            {name?.charAt(0) || "?"}
          </div>

          <div>
            <h2 className="text-xl font-medium">{name}</h2>
            <p className="text-sm text-[#A78D71]">{customerId ? `CUST-${customerId.slice(-3).toUpperCase()}` : "-"}</p>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 w-full"></div>
      <div className="flex items-center justify-between gap-6 text-sm text-gray-600 p-6">
        <div className="flex items-center gap-2 text-md text-black">
          <Mail className="text-gold/90" size={22} />
          {email}
        </div>

        <div className="flex items-center  gap-2">
          <div className="flex items-center gap-2 text-black  text-md">
            Account Created :
          </div>
          <div className="flex items-center gap-2 text-md text-black">
            {createdDate ? formatDate(createdDate) : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
