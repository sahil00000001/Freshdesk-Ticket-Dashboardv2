import { z } from "zod";

export const customFieldsSchema = z.object({
  cf_customer_reference_number: z.string().nullable(),
  cf_stel_reference_number: z.string().nullable(),
  cf_order_tracking: z.string().nullable(),
  cf_entry_id: z.string().nullable(),
});

export const ticketSchema = z.object({
  id: z.number(),
  subject: z.string(),
  description: z.string(),
  description_text: z.string(),
  status: z.number(),
  priority: z.number(),
  type: z.string(),
  source: z.number(),
  requester_id: z.number(),
  responder_id: z.number().nullable(),
  company_id: z.number().nullable(),
  group_id: z.number(),
  product_id: z.number(),
  email_config_id: z.number(),
  due_by: z.string(),
  fr_due_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_escalated: z.boolean(),
  fr_escalated: z.boolean(),
  spam: z.boolean(),
  tags: z.array(z.string()),
  custom_fields: customFieldsSchema,
  cc_emails: z.array(z.string()),
  fwd_emails: z.array(z.string()),
  reply_cc_emails: z.array(z.string()),
  ticket_cc_emails: z.array(z.string()),
  ticket_bcc_emails: z.array(z.string()),
  support_email: z.string().nullable(),
  to_emails: z.string().nullable(),
  association_type: z.string().nullable(),
  attachments: z.array(z.any()),
  source_additional_info: z.any().nullable(),
  structured_description: z.any().nullable(),
});

export const ticketRequestSchema = z.object({
  ticketId: z.string().min(1, "Ticket ID is required"),
});

export type Ticket = z.infer<typeof ticketSchema>;
export type CustomFields = z.infer<typeof customFieldsSchema>;
export type TicketRequest = z.infer<typeof ticketRequestSchema>;

// Status mappings
export const STATUS_MAP: Record<number, string> = {
  2: "Open",
  3: "Pending",
  4: "Resolved",
  5: "Closed",
  6: "Waiting on Customer",
  7: "Waiting on Third Party",
};

export const PRIORITY_MAP: Record<number, string> = {
  1: "Low",
  2: "Medium", 
  3: "High",
  4: "Urgent",
};

export const SOURCE_MAP: Record<number, string> = {
  1: "Email",
  2: "Portal",
  3: "Phone",
  7: "Chat",
  8: "Mobihelp",
  9: "Feedback Widget",
  10: "Outbound Email",
};
