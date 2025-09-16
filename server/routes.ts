import type { Express } from "express";
import { createServer, type Server } from "http";
import { ticketRequestSchema, ticketSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Freshdesk API credentials
  const FRESHDESK_API_URL = "https://westminsterlegalisationse.freshdesk.com/api/v2/tickets";
  const FRESHDESK_USERNAME = "bBu3ntu40swzcYlZ54ZM";
  const FRESHDESK_PASSWORD = "X";

  app.get("/api/tickets/:ticketId", async (req, res) => {
    try {
      const { ticketId } = req.params;
      
      // Validate ticket ID
      const validation = ticketRequestSchema.safeParse({ ticketId });
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid ticket ID format",
          errors: validation.error.errors 
        });
      }

      // Check if ticket ID is numeric
      if (!/^\d+$/.test(ticketId)) {
        return res.status(400).json({ 
          message: "Ticket ID must be a number" 
        });
      }

      // Fetch ticket from Freshdesk API
      const response = await fetch(`${FRESHDESK_API_URL}/${ticketId}`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${Buffer.from(`${FRESHDESK_USERNAME}:${FRESHDESK_PASSWORD}`).toString('base64')}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ 
            message: "Ticket not found. Please check the ticket ID and try again." 
          });
        }
        if (response.status === 401) {
          return res.status(401).json({ 
            message: "Authentication failed. Invalid API credentials." 
          });
        }
        if (response.status === 403) {
          return res.status(403).json({ 
            message: "Access denied. Insufficient permissions to access this ticket." 
          });
        }
        
        throw new Error(`Freshdesk API error: ${response.status} ${response.statusText}`);
      }

      const ticketData = await response.json();
      
      // Validate the response data structure
      const ticketValidation = ticketSchema.safeParse(ticketData);
      if (!ticketValidation.success) {
        console.error("Invalid ticket data structure:", ticketValidation.error);
        return res.status(500).json({ 
          message: "Invalid ticket data received from Freshdesk API" 
        });
      }

      res.json(ticketValidation.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          return res.status(503).json({ 
            message: "Unable to connect to Freshdesk API. Please try again later." 
          });
        }
      }
      
      res.status(500).json({ 
        message: "Internal server error while fetching ticket data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
