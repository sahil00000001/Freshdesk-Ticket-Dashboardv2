import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@shared/schema";
import TicketSearch from "../components/ticket-search";
import TicketHeader from "../components/ticket-header";
import CustomerInfo from "../components/customer-info";
import DeliveryInfo from "../components/delivery-info";
import Timeline from "../components/timeline";
import SystemInfo from "../components/system-info";
import TicketDescription from "../components/ticket-description";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Ticket as TicketIcon } from "lucide-react";

export default function Dashboard() {
  const [ticketId, setTicketId] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: ticket,
    isLoading,
    error,
    refetch,
  } = useQuery<Ticket>({
    queryKey: ["/api/tickets", ticketId],
    enabled: shouldFetch && !!ticketId,
    retry: false,
  });

  const handleFetchTicket = (id: string) => {
    setTicketId(id);
    setShouldFetch(true);
    if (id === ticketId) {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <TicketIcon className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Freshdesk Ticket Dashboard
              </h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Westminster Legalisation Services
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ticket Search */}
        <TicketSearch
          onFetchTicket={handleFetchTicket}
          isLoading={isLoading}
        />

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription data-testid="error-message">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </AlertDescription>
          </Alert>
        )}

        {/* Success State - Ticket Dashboard */}
        {ticket && (
          <div className="fade-in space-y-6" data-testid="dashboard-container">
            <TicketHeader ticket={ticket} />
            <TicketDescription ticket={ticket} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CustomerInfo ticket={ticket} />
              <DeliveryInfo ticket={ticket} />
            </div>

            <Timeline ticket={ticket} />
            <SystemInfo ticket={ticket} />
          </div>
        )}
      </main>
    </div>
  );
}
