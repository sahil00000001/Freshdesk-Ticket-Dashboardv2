import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { Ticket } from "@shared/schema";

interface SystemInfoProps {
  ticket: Ticket;
}

export default function SystemInfo({ ticket }: SystemInfoProps) {
  return (
    <Card>
      <CardHeader className="bg-secondary/50 border-b border-border">
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          System Information & Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Settings className="w-8 h-8 text-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Entry ID
            </label>
            <p className="text-3xl font-bold text-foreground mt-2" data-testid="text-entry-id">
              {ticket.custom_fields.cf_entry_id || "Not set"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
