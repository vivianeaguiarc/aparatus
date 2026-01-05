import { getBarbershopById } from "@/data/barbershops";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { ServiceItem } from "@/components/service-item";
import { BackButton } from "@/components/back-button";
import { PhoneItem } from "@/components/phone-item";

interface BarbershopPageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <div className="absolute left-4 top-4">
          <BackButton />
        </div>
      </div>

      <div className="px-5 pb-6">
        <div className="relative -mt-6 rounded-2xl bg-card p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">{barbershop.name}</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {barbershop.address}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase">SOBRE NÓS</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {barbershop.description}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-sm font-bold uppercase">SERVIÇOS</h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-sm font-bold uppercase">CONTATO</h2>
          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-8 bg-secondary py-8 text-center">
        <p className="text-xs text-foreground">© 2025 Copyright Aparatus</p>
        <p className="text-xs text-muted-foreground">
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default BarbershopPage;
