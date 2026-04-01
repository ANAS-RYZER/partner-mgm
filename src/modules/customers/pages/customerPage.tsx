"use client";
import React from "react";
import TableComponent from "@/components/TableComponent";
import { LoaderCircle, Search, UsersIcon } from "lucide-react";
import { applicationListCols } from "@/modules/customers/schema/applicationListCols";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { useCustomerKPI } from "../hooks/useCustomerKPI";
import DashboardCard from "@/components/DashboardCard";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/Pagination";



const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching: isCustomersLoading, error } = useCustomers(
    debouncedSearchTerm,
    currentPage,
    limit
  );
  const { data: customerCount, isFetching: isCustomerCountLoading } = useCustomerKPI();

  const customers = data?.customers || [];
  const totalPages = data?.totalPages || 1;
  const currentPageNumber = data?.page || currentPage;
  const serverLimit = data?.limit || limit;

  const cols = applicationListCols();

  if (isCustomerCountLoading && isCustomersLoading) {
    return <div className="flex items-center justify-center p-10">
      <LoaderCircle size={50} className="animate-spin text-gold" />
    </div>
  }

  return (
    <>
      <div className="space-y-4 p-5">
        <h1 className="font-semibold text-2xl">Customer Management</h1>

        <div className="grid grid-cols-4 gap-4">
          <DashboardCard title="Total Customers" value={customerCount?.totalCustomers} rightIcon={<UsersIcon size={20} />} rightIconClassName="text-blue-500 rounded-full p-2 bg-blue-50" />
        </div>

        <h1 className="text-lg font-semibold">
          Customer List
        </h1>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Customers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
        {!error && (
          <Pagination
            currentPage={currentPageNumber}
            totalPages={totalPages}
            hasPreviousPage={currentPageNumber > 1}
            hasNextPage={currentPageNumber < totalPages}
            limit={serverLimit}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(newLimit) => {
              setLimit(newLimit);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </>
  );
}
export default CustomersPage;
