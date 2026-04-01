import IdShorterComponent from "@/components/IdShorterComponent";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
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
            <IdShorterComponent id={agentId} model="CUST" />
          </span>
        );
      },
    },
    {
      header: "Profile",
      accessorKey: "avatar",
      cell: ({ row }: { row: any }) => {
        const name = row.original.fullName;

        return (
          <div className="flex items-center gap-3">
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
