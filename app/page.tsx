import { BarbershopItem } from "@/components/barbershop-item";
import { BookingItem } from "@/components/booking-item";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { PageConatiner, PageSectiionTitle, PageSectionContent, PageSectionScroller } from "@/components/ui/page";
import { getBarbershops, getPopularBarbershops } from "@/data/barbershops";
import banner from "@/public/banner.png";
import Image from "next/image";

export default async function Home() {
  const barbershops = await getBarbershops()
  const popularBarbershops = await getPopularBarbershops()
  return (
    <>
      <div>
        <Header />
        <PageConatiner>
          <div className="px-4">
            <Image
              src={banner}
              alt="Agende com a Aparatus"
              sizes="100vw"
              className="h-auto w-full"
            />
            P
          </div>
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
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </PageSectionScroller>
         </PageSectionContent>
        </PageConatiner>
      </div>
    </>
  );
}
