import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Plus, Calendar, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { Ticket } from "@shared/schema";

interface TimelineProps {
  ticket: Ticket;
}

export default function Timeline({ ticket }: TimelineProps) {
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        date: format(date, "MMM dd, yyyy"),
        time: format(date, "h:mm a"),
      };
    } catch (error) {
      return {
        date: "Invalid date",
        time: "",
      };
    }
  };

  const createdAt = formatDateTime(ticket.created_at);
  const updatedAt = formatDateTime(ticket.updated_at);
  const dueBy = formatDateTime(ticket.due_by);

  return (
    <Card>
      <CardHeader className="bg-secondary/50 border-b border-border">
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Timeline & Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 text-green-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Plus className="w-5 h-5" />
            </div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Created
            </label>
            <p className="text-lg font-semibold text-foreground mt-1" data-testid="text-created-date">
              {createdAt.date}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-created-time">
              {createdAt.time}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Due Date
            </label>
            <p className="text-lg font-semibold text-foreground mt-1" data-testid="text-due-date">
              {dueBy.date}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-due-time">
              {dueBy.time}
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-5 h-5" />
            </div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Last Updated
            </label>
            <p className="text-lg font-semibold text-foreground mt-1" data-testid="text-updated-date">
              {updatedAt.date}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-updated-time">
              {updatedAt.time}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
