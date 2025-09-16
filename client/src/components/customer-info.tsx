import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Mail, Phone, Hash } from "lucide-react";
import { Ticket } from "@shared/schema";

interface CustomerInfoProps {
  ticket: Ticket;
}

export default function CustomerInfo({ ticket }: CustomerInfoProps) {
  // Parse customer information from description_text
  const parseCustomerInfo = (description: string) => {
    const info = {
      name: "",
      company: "",
      email: "",
      phone: "",
      reference: "",
      recipientName: "",
      recipientPhone: "",
    };

    // Extract full name
    const nameMatch = description.match(/Full Name:\s*([^\n]+?)(?:\s+Company Name|$)/);
    if (nameMatch) info.name = nameMatch[1].trim();

    // Extract company
    const companyMatch = description.match(/Company Name[^:]*:\s*([^\n]+?)(?:\s+Email|$)/);
    if (companyMatch) info.company = companyMatch[1].trim();

    // Extract email
    const emailMatch = description.match(/Email:\s*([^\s\n]+)/);
    if (emailMatch) info.email = emailMatch[1].trim();

    // Extract phone
    const phoneMatch = description.match(/Telephone:\s*([^\n]+?)(?:\s+Your Reference|$)/);
    if (phoneMatch) info.phone = phoneMatch[1].trim();

    // Extract reference
    const refMatch = description.match(/Your Reference:\s*([^\n]+?)(?:\s+Your Billing|$)/);
    if (refMatch) info.reference = refMatch[1].trim();

    // Extract recipient information
    const recipientNameMatch = description.match(/Recipient's Full Name:\s*([^\n]+?)(?:\s+Recipient's Telephone|$)/);
    if (recipientNameMatch) info.recipientName = recipientNameMatch[1].trim();

    const recipientPhoneMatch = description.match(/Recipient's Telephone number:\s*([^\n]+?)(?:\s+Shipping Address|$)/);
    if (recipientPhoneMatch) info.recipientPhone = recipientPhoneMatch[1].trim();

    return info;
  };

  const customerInfo = parseCustomerInfo(ticket.description_text);

  return (
    <Card>
      <CardHeader className="bg-secondary/50 border-b border-border">
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Full Name
            </label>
            <p className="text-base font-medium text-foreground" data-testid="text-customer-name">
              {customerInfo.name || "Not provided"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Building className="w-4 h-4 text-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Company
            </label>
            <p className="text-base font-medium text-foreground" data-testid="text-customer-company">
              {customerInfo.company || "Not provided"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Email
            </label>
            <p className="text-base text-foreground" data-testid="text-customer-email">
              {customerInfo.email || "Not provided"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Telephone
            </label>
            <p className="text-base text-foreground" data-testid="text-customer-phone">
              {customerInfo.phone || "Not provided"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Hash className="w-4 h-4 text-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Customer Reference
            </label>
            <p className="text-base text-foreground" data-testid="text-customer-reference">
              {customerInfo.reference || "Not provided"}
            </p>
          </div>
        </div>
        
        {(customerInfo.recipientName || customerInfo.recipientPhone) && (
          <>
            <div className="border-t border-border pt-4 mt-4">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Recipient Information
              </h4>
            </div>
            
            {customerInfo.recipientName && (
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/60 p-2 rounded-full">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Recipient Name
                  </label>
                  <p className="text-base font-medium text-foreground" data-testid="text-recipient-name">
                    {customerInfo.recipientName}
                  </p>
                </div>
              </div>
            )}
            
            {customerInfo.recipientPhone && (
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/60 p-2 rounded-full">
                  <Phone className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Recipient Phone
                  </label>
                  <p className="text-base text-foreground" data-testid="text-recipient-phone">
                    {customerInfo.recipientPhone}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
