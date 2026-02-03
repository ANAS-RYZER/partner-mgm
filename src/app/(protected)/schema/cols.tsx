import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";

export const applicationListCols = () => {

  return [
    {
      header: "Customer ID",
      accessorKey: "agentId",
      cell: ({ row }: { row: any }) => {
        const agentId = row.original._id;
        return <span className="font-mono text-xs">{agentId ? `CUST-${agentId.slice(-3).toUpperCase()}` : "-"}</span>;
      },
    },

    {
      header: "Profile",
      accessorKey: "avatar",
      cell: ({ row }: { row: any }) => {
        const profile = row.original.avatar;
        return profile ? (
      <Image
            src={profile}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          
    ) : (
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs">
        N/A
      </div>
    );
      },
      
    },

    {
      header: "Name",
      accessorKey: "fullName",
      cell: ({ row }: { row: any }) => {
        return <span className="font-medium">{row.original.fullName || "-"}</span>;
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: { row: any }) => {
        return <span>{row.original.email || "-"}</span>;
      },
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="capitalize">{row.original.phoneNumber || "-"}</span>
        );
      },
    },
   

    {
      header: "Actions",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};

