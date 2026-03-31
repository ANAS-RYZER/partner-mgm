"use client";
import React from "react";
import TableComponent from "@/components/TableComponent";
import { LoaderCircle, Search, UsersIcon } from "lucide-react";
import { applicationListCols } from "@/app/(protected)/schema/cols";
import { Input } from "@/components/ui/input";
import { useState } from "react";


function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading: isCustomersLoading, error } = useCustomers(debouncedSearchTerm);
  const { data: customerCount, isFetching: isCustomerCountLoading } = useCustomerKPI();

  const customers = data?.customers || [];
  console.log("customerCount", customerCount);

   const cols = applicationListCols();

  if (isCustomerCountLoading && isCustomersLoading) {
    return <div className="flex items-center justify-center p-10">
      <LoaderCircle size={50} className="animate-spin text-gold" />
    </div>
  }

  return (
    <>
      <section className="space-y-6 p-5">
        <h1 className="font-semibold text-2xl">Customer Management</h1>

        <div className="grid grid-cols-4 gap-4">
          <DashboardCard title="Total Customers" value={customerCount?.totalCustomers}/>
        </div>

       
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-5 bg-white"
            />
          </div>
        

        <div className="rounded-xl bg-background">
          {isCustomersLoading ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="p-10 text-red-500">Failed to load customers</div>
          ) : (
            <TableComponent
              columns={cols}
              data={customers}
              model="Customer"
            />
          )}
        </div>
      </section>
    </>
  );
}
import { useCustomers } from "../hooks/useCustomers";
import { useCustomerKPI } from "../hooks/useCustomerKPI";
import DynaCard from "@/components/DashboardCard";
import DashboardCard from "@/components/DashboardCard";
import { useDebounce } from "@/hooks/useDebounce";

export default CustomersPage;
