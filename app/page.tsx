import { BarbershopItem } from "@/components/barbershop-item";
import { BookingItem } from "@/components/booking-item";
import Header from "@/components/header";
import {
  PageConatiner,
  PageSectiionTitle,
  PageSectionContent,
  PageSectionScroller,
} from "@/components/ui/page";
import QuickSerach from "@/components/ui/quick-search";
import { getBarbershops, getPopularBarbershops } from "@/data/barbershops";
import banner from "@/public/banner.png";
import Image from "next/image";

export default async function Home() {
  const barbershops = await getBarbershops();
  const popularBarbershops = await getPopularBarbershops();
  return (
    <>
      <Header />
      <PageConatiner>
        <QuickSerach />
        <Image
          src={banner}
          alt="Agende com a Aparatus"
          sizes="100vw"
          className="h-auto w-full"
        />
        <PageSectionContent>
          <PageSectiionTitle>Agendamentos</PageSectiionTitle>
          <BookingItem />
        </PageSectionContent>
        <PageSectionContent>
          <PageSectiionTitle>Barbearias</PageSectiionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
        <PageSectionContent>
          <PageSectiionTitle>Barbearias Populares</PageSectiionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
      </PageConatiner>
    </>
  );
}
