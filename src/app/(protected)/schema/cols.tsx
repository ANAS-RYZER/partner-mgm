import { Button } from "@/components/ui/button";
import { Eye, Link } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const applicationListCols = () => {
  return [
    {
      header: "Customer ID",
      accessorKey: "agentId",
      cell: ({ row }: { row: any }) => {
        const agentId = row.original._id;
        return (
          <span className="font-mono text-xs">
            {agentId ? `CUST-${agentId.slice(-3).toUpperCase()}` : "-"}
          </span>
        );
      },
    },

    {
      header: "Profile",
      accessorKey: "avatar",
      cell: ({ row }: { row: any }) => {
        const profile = row.original.avatar;
        const name = row.original.fullName;
        console.log(profile);

        return (
          <div className="flex items-center gap-3">
           
            {/* <Image src={profile} alt={name || "Profile"} width={40} height={40} className="rounded-full object-cover" /> */}
            <span className="font-medium text-sm ">{name || "-"}</span>
          </div>
        );
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
      header: "Actions",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => {
        const router = useRouter();
        const customerId = row.original._id;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10"
              onClick={() => router.push(`/customers/${customerId}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};
