import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Ticket } from "@shared/schema";

interface TicketDescriptionProps {
  ticket: Ticket;
}

export default function TicketDescription({ ticket }: TicketDescriptionProps) {
  // Function to safely render HTML description
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <Card>
      <CardHeader className="bg-secondary/50 border-b border-border">
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Ticket Description
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-muted/30 rounded-lg p-6 min-h-96 max-h-screen overflow-y-auto">
          {ticket.description ? (
            <div
              className="prose prose-sm max-w-none text-foreground"
              data-testid="ticket-description-html"
              dangerouslySetInnerHTML={createMarkup(ticket.description)}
            />
          ) : (
            <div className="text-foreground" data-testid="ticket-description-text">
              <pre className="whitespace-pre-wrap font-sans">
                {ticket.description_text || "No description available"}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
