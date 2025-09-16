import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Loader2 } from "lucide-react";

interface TicketSearchProps {
  onFetchTicket: (ticketId: string) => void;
  isLoading: boolean;
}

export default function TicketSearch({ onFetchTicket, isLoading }: TicketSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onFetchTicket(trimmedValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <div className="flex-1">
            <Label htmlFor="ticketId" className="block text-sm font-medium text-foreground mb-2">
              <Search className="inline w-4 h-4 mr-2" />
              Ticket ID
            </Label>
            <Input
              type="text"
              id="ticketId"
              data-testid="input-ticket-id"
              placeholder="Enter ticket ID (e.g., 21648)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              data-testid="button-fetch-ticket"
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <span>Fetching...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>Fetch Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
