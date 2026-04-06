import IdShorterComponent from "@/components/IdShorterComponent";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  name: string;
  email: string;
  orderId: string;
}

export default function CustomerHeader({ name, email, orderId }: Props) {
  return (
    <Card className="shadow-sm border rounded-xl">
      <CardContent className="p-5 sm:p-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Left Section */}
          <div className="flex items-center gap-4">
            
            {/* Avatar */}
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white text-lg sm:text-xl font-semibold">
              {name?.charAt(0) || "?"}
            </div>

            {/* Name + Email */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {name || "-"}
              </h2>
              <p className="text-sm text-muted-foreground break-all">
                {email || "-"}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex gap-2 sm:items-end text-sm">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold text-gray-900">
              <IdShorterComponent id={orderId} model="ORD" />
            </span>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}