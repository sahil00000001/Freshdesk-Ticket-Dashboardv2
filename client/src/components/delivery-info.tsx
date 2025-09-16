import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Ticket } from "@shared/schema";

interface DeliveryInfoProps {
  ticket: Ticket;
}

export default function DeliveryInfo({ ticket }: DeliveryInfoProps) {
  // Parse delivery information from description_text
  const parseDeliveryInfo = (description: string) => {
    const info = {
      billingAddress: "",
      shippingAddress: "",
      apostilleService: "",
      consularService: "",
      documentType: "",
      country: "",
      deliveryMethod: "",
      courierService: "",
      specialInstructions: "",
    };

    // Extract billing address
    const billingMatch = description.match(/Your Billing Address:\s*([^\n]+?)(?:\s+Document Type|$)/);
    if (billingMatch) {
      info.billingAddress = billingMatch[1].trim();
    }

    // Extract shipping address
    const shippingMatch = description.match(/Shipping Address[^:]*:\s*([^\n]+?)(?:\s+Attached Files|Special Instructions|$)/);
    if (shippingMatch) {
      info.shippingAddress = shippingMatch[1].trim();
    }

    // Extract apostille service details
    const apostilleMatch = description.match(/• ([^•\n]*Apostille[^•\n]*)/);
    if (apostilleMatch) {
      info.apostilleService = apostilleMatch[1].trim();
    }

    // Extract consular service details  
    const consularMatch = description.match(/• ([^•\n]*Consulate[^•\n]*)/);
    if (consularMatch) {
      info.consularService = consularMatch[1].trim();
    }

    // Extract document type
    const docMatch = description.match(/Document Type and Quantity[^:]*:\s*([^\n]+?)(?:\s+Country|$)/);
    if (docMatch) {
      info.documentType = docMatch[1].trim();
    }

    // Extract country/consulate
    const countryMatch = description.match(/Country or Consulate[^:]*:\s*([^\n]+?)(?:\s+FCDO|$)/);
    if (countryMatch) {
      info.country = countryMatch[1].trim();
    }

    // Extract delivery method
    const deliveryMatch = description.match(/Delivery or Collection Method:\s*([^\n]+?)(?:\s+Delivery Services|$)/);
    if (deliveryMatch) {
      info.deliveryMethod = deliveryMatch[1].trim();
    }

    // Extract courier service
    const courierMatch = description.match(/• ([^•\n]*Courier[^•\n]*)/);
    if (courierMatch) {
      info.courierService = courierMatch[1].trim();
    }

    // Extract special instructions
    const instructionsMatch = description.match(/Special Instructions[^:]*:\s*([^\n]+?)(?:\s+Entry ID|$)/);
    if (instructionsMatch) {
      info.specialInstructions = instructionsMatch[1].trim();
    }

    return info;
  };

  const deliveryInfo = parseDeliveryInfo(ticket.description_text);

  return (
    <Card>
      <CardHeader className="bg-secondary/50 border-b border-border">
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Billing Address
          </label>
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-sm text-foreground leading-relaxed" data-testid="text-billing-address">
              {deliveryInfo.billingAddress || "Not provided"}
            </p>
          </div>
        </div>
        
        {deliveryInfo.shippingAddress && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Shipping Address
            </label>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm text-foreground leading-relaxed" data-testid="text-shipping-address">
                {deliveryInfo.shippingAddress}
              </p>
            </div>
          </div>
        )}
        
        {deliveryInfo.apostilleService && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Apostille Service
            </label>
            <p className="text-base font-medium text-foreground mt-1" data-testid="text-apostille-service">
              {deliveryInfo.apostilleService}
            </p>
          </div>
        )}
        
        {deliveryInfo.consularService && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Consular Service
            </label>
            <p className="text-base font-medium text-foreground mt-1" data-testid="text-consular-service">
              {deliveryInfo.consularService}
            </p>
          </div>
        )}
        
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Document Type
          </label>
          <p className="text-base text-foreground mt-1" data-testid="text-document-type">
            {deliveryInfo.documentType || "Not specified"}
          </p>
        </div>
        
        {deliveryInfo.country && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Country/Consulate
            </label>
            <p className="text-base text-foreground mt-1" data-testid="text-country">
              {deliveryInfo.country}
            </p>
          </div>
        )}
        
        {deliveryInfo.deliveryMethod && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Delivery Method
            </label>
            <p className="text-base text-foreground mt-1" data-testid="text-delivery-method">
              {deliveryInfo.deliveryMethod}
            </p>
          </div>
        )}
        
        {deliveryInfo.courierService && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Courier Service
            </label>
            <p className="text-base text-foreground mt-1" data-testid="text-courier-service">
              {deliveryInfo.courierService}
            </p>
          </div>
        )}
        
        {deliveryInfo.specialInstructions && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
            <label className="text-xs font-medium text-amber-800 dark:text-amber-200 uppercase tracking-wide">
              ⚠️ Special Instructions
            </label>
            <p className="text-base font-medium text-amber-900 dark:text-amber-100 mt-1" data-testid="text-special-instructions">
              {deliveryInfo.specialInstructions}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
