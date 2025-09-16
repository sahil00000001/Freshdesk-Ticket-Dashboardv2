import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Ticket, STATUS_MAP, PRIORITY_MAP, SOURCE_MAP } from "@shared/schema";

interface TicketHeaderProps {
  ticket: Ticket;
}

export default function TicketHeader({ ticket }: TicketHeaderProps) {
  const getStatusVariant = (status: number) => {
    switch (status) {
      case 4: // Resolved
        return "default";
      case 2: // Open
        return "destructive";
      case 3: // Pending
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority: number) => {
    switch (priority) {
      case 4: // Urgent
        return "destructive";
      case 3: // High
        return "destructive";
      case 2: // Medium
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader className="bg-primary/5 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Ticket Information
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Badge variant={getStatusVariant(ticket.status)} data-testid="badge-status">
              {STATUS_MAP[ticket.status] || `Status ${ticket.status}`}
            </Badge>
            <Badge variant={getPriorityVariant(ticket.priority)} data-testid="badge-priority">
              {PRIORITY_MAP[ticket.priority] || `Priority ${ticket.priority}`}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Ticket ID
            </label>
            <p className="text-2xl font-bold text-foreground mt-1" data-testid="text-ticket-id">
              {ticket.id}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Type
            </label>
            <p className="text-lg font-medium text-foreground mt-1" data-testid="text-ticket-type">
              {ticket.type}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Source
            </label>
            <p className="text-lg font-medium text-foreground mt-1" data-testid="text-ticket-source">
              {SOURCE_MAP[ticket.source] || `Source ${ticket.source}`}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Group ID
            </label>
            <p className="text-lg font-medium text-foreground mt-1" data-testid="text-group-id">
              {ticket.group_id}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Subject
          </label>
          <p className="text-lg text-foreground mt-1" data-testid="text-ticket-subject">
            {ticket.subject}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
