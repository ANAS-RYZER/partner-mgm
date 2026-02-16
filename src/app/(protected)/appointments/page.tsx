import TableComponent from "@/components/TableComponent";
import { Table } from "lucide-react";
import React from "react";
import AppointmentsPage from "@/components/Appoinments/Appointments";

function Appointments() {

  return (
    <>
      <div className="p-5">
        <AppointmentsPage />
      </div>
    </>
  );
}

export default Appointments;
