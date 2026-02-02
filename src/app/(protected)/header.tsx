import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-20 bg-mgm text-white flex items-center px-6 shadow-md  justify-between">
      <h1 className="text-lg font-semibold text1-gold">Agent Dashboard</h1>
      <div className="flex items-center gap-5">
        <div>
          <p>Agent ID</p>
          <h1>AGT-ZDXG6V83M</h1> {/* AGENT ID HERE */}
        </div>
        <Button className="bg-white/20 text-white">
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
