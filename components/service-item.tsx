import { BarbershopService } from "@/generated/prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <div className="relative h-28 w-28 flex-shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="font-semibold">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
        <p className="font-semibold">{formatPrice(service.priceInCents)}</p>
      </div>

      <Button className="bg-primary text-primary-foreground">Reservar</Button>
    </div>
  );
};
