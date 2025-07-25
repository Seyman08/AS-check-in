"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Users } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button
          variant="outline"
          className="h-12 justify-start rounded-xl border-gray-200 hover:bg-gray-50"
          onClick={() => toast.info("Feature coming soon!")}
        >
          <Download className="mr-2 h-4 w-4" />
          Generate Weekly Report
        </Button>
        <Button
          variant="outline"
          className="h-12 justify-start rounded-xl border-gray-200 hover:bg-gray-50"
          onClick={() => toast.info("Feature coming soon!")}
        >
          <Users className="mr-2 h-4 w-4" />
          Manage Staff
        </Button>
      </div>
    </div>
  );
};
