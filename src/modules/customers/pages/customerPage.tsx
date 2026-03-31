"use client";
import React from "react";
import TableComponent from "@/components/TableComponent";
import { LoaderCircle, Search } from "lucide-react";
import { applicationListCols } from "@/app/(protected)/schema/cols";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";


function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useCustomers();

  const customers = data?.customers || [];

   const cols = applicationListCols();

  const filteredCustomers = customers.filter((c:any) =>
  (c.fullName ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
  (c.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
      <section className="space-y-6 p-5">
        <h1 className="font-medium">Customer Management</h1>

        <div className="w-75">
          {/* Total Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{customers.length}</p>
            </CardContent>
          </Card>

         
        </div>

       
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-5 bg-white"
            />
          </div>
        

        <div className="rounded-xl bg-background">
          {isLoading ? (
            <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
          ) : error ? (
            <div className="p-10 text-red-500">Failed to load customers</div>
          ) : (
            <TableComponent
              columns={cols}
              data={filteredCustomers}
              model="Customer"
            />
          )}
        </div>
      </section>
    </>
  );
}
import { useCustomers } from "../hooks/useCustomers";

export default CustomersPage;
