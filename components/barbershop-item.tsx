import { Barbershop } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <>
      <Link
        href={`/barbershops/${barbershop.id}`}
        className="relative min-h-[200px] min-w-[290px] rounded-xl"
      >
        <div className="to-transaparet absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-linear-to-t from-black"></div>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="rounded-xl object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 z-20 rounded-b-xl bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{barbershop.name}</h3>
          <p className="text-background text-xs">{barbershop.address}</p>
        </div>
      </Link>
    </>
  );
};
